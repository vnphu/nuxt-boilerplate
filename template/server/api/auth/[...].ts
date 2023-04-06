import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { UserResponse, LoginResponse, RefreshTokenResponse, Jwt } from 'utils/model'

const { apiBase } = useRuntimeConfig()

function parseJwt(token: string): Jwt {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

async function refreshAccessToken(token: { accessToken: string; accessTokenExpires: string; refreshToken: string }) {
  try {
    console.warn('trying to post to refresh token')
    const refreshedTokens = await $fetch<RefreshTokenResponse | null>(`user/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US',
        Authorization: `Bearer ${token.refreshToken}`,
      },
    })
    if (!refreshedTokens || !refreshedTokens.data) {
      console.warn('No refreshed tokens')
      throw refreshedTokens
    }
    console.warn('Refreshed tokens successfully')
    return {
      ...token,
      accessToken: refreshedTokens.data.accessToken,
      accessTokenExpires: parseJwt(refreshedTokens.data.accessToken).exp,
      refreshToken: refreshedTokens.data.refreshToken,
    }
  } catch (error) {
    console.warn('Error refreshing token', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NuxtAuthHandler({
  secret: 'my-superb-secret',
  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-ignore
    CredentialsProvider.default({
      name: 'Credentials',
      async authorize(credentials: any) {
        try {
          const payload = {
            email: credentials.username,
            password: credentials.password,
          }
          console.log(payload)
          const userTokens = await $fetch<LoginResponse | null>(`${apiBase}admin/auth/login`, {
            method: 'POST',
            body: payload,
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'en-US',
            },
          })
          const userDetails = await $fetch<UserResponse | null>(`admin/info`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'en-US',
              Authorization: `Bearer ${userTokens?.data.accessToken}`,
            },
          })
          console.log('error')
          if (!userTokens || !userTokens.data || !userDetails || !userDetails.data.user) {
            throw createError({
              statusCode: 500,
              statusMessage: 'Next auth failed',
            })
          }
          const user = {
            id: userDetails.data.user.id,
            username: userDetails.data.user.username,
            channelName: userDetails.data.user.channelName,
            firstName: userDetails.data.user.firstName,
            lastName: userDetails.data.user.lastName,
            email: userDetails.data.user.email,
            profileImage: userDetails.data.user.profileImage,
            accessToken: userTokens.data.accessToken,
            accessTokenExpires: parseJwt(userTokens.data.accessToken).exp,
            refreshToken: userTokens.data.refreshToken,
          }
          return user
        } catch (error) {
          console.warn('Error logging in', error)
          return null
        }
      },
    }),
    // ]
  ],
  session: {
    strategy: 'database',
    maxAge: 129600, // seconds
  },
  jwt: {
    maxAge: 129600, // seconds
  },
  callbacks: {
    jwt({ token, user, account }) {
      console.log('callback', { token, user, account })
      if (account && user) {
        console.warn('JWT callback', { token, user, account })
        return {
          ...token,
          ...user,
        }
      }
      // Handle token refresh before it expires
      if (token.accessTokenExpires && Math.round(Date.now() / 1000) > (token.accessTokenExpires as number)) {
        console.warn('Token is expired. Getting a new')
        //@ts-ignore
        return refreshAccessToken(token)
      }
      return token
    },
    session({ session, token }) {
      console.log(session, token, 'session, token ')
      session.user = {
        ...session.user,
        ...token,
      }
      return session
    },
  },
})
