import { getServerSession } from '#auth'
export default eventHandler(async (event) => {
  console.log('handle singin')
  try {
    // const session = await getServerSession(event)
    // if (!session) {
    //   return { status: 'unauthenticated!' }
    // }
    // return { status: 'authenticated!' }
  } catch (error) {
    console.log('error')
    console.log(error, 'error')
  }
})
