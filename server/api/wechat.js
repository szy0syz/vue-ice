import { getWechat } from '../wechat'

const client = getWechat()

export async function getSignatureAsync(url) {
  const data = await client.fetchAccessToken()
  const token = data.accsee_token
  console.log('~~~控制器里token:', data)
  const ticketData = await client.fetchTicket(token)
  const ticket = ticketData.ticket

  let params = client.sign(ticket)
  params.appId = client.appID

  return params
}
