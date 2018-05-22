import axios from 'axios'

const baseUrl = ''
// const apiUrl = 'http://rap2api.taobao.org/app/mock/4970/GET/'

class Services {
  getWechatSignature(url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }

  getUserByOAuth(url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
  }

  getWechatOAuth(url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${encodeURIComponent(url)}`)
  }

  ceateOrder({ productId, name, address, phoneNumber }) {
    return axios.post(`${baseUrl}/wechat-pay`, {
      productId,
      name,
      address,
      phoneNumber
    })
  }

  fetchHouses() {
    return axios.get(`${baseUrl}/wiki/houses`)
  }

  fetchCharacters() {
    return axios.get(`${baseUrl}/wiki/characters`)
  }

  fetchHouse(id) {
    return axios.get(`${baseUrl}/wiki/houses/${id}`)
  }

  fetchCharacter(id) {
    return axios.get(`${baseUrl}/wiki/characters/${id}`)
  }

  fetchProducts() {
    return axios.get(`${baseUrl}/api/products`)
  }

  fetchProduct(id) {
    return axios.get(`${baseUrl}/api/products/${id}`)
  }

  getPayments() {
    return axios.get(`${baseUrl}/admin/payments`)
  }

  fetchUserAndOrders() {
    return axios.get(`http://rap2api.taobao.org/app/mock/4970/GET//api/user`)
  }
}

export default new Services()
