import axios from 'axios'

const baseUrl = ''

class Services {
  getWechatSignature(url) {
    // 就是本机地址
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }
}

export default new Services()
