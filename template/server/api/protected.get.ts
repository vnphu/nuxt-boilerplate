import { getServerSession } from '#auth'
export default eventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    if (!session) {
      return { status: 'unauthenticated!' }
    }
    return { status: 'authenticated!' }
  } catch (error) {
    console.log(error)
  }
})
