const ConfigByEnvs = {
  development: {
    API_URL: 'https://mightyid-v2-api-nginx.studyguide.dev',
    AUTH_SECRET: `example`,
  },
  production: {
    API_URL: `https://api.example.com`,
    AUTH_SECRET: `example`,
  },
}

export { ConfigByEnvs }
