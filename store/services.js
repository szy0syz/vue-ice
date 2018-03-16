import axios from 'axios'

const baseUrl = ''
const apiUrl = 'http://rap2api.taobao.org/app/mock/4970/GET/'

class Services {
  getWechatSignature(url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }

  getUserByOAuth(url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
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
    return axios.get(`${apiUrl}/api/products`)
  }

  fetchProduct(id) {
    return axios.get(`${apiUrl}/api/products/{id}`)
  }

  fetchUserAndOrders() {
    return axios.get(`http://rap2api.taobao.org/app/mock/4970/GET//api/user`)
  }
}

export default new Services()
