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
    return axios.get(`${apiUrl}/wiki/houses`)
  }

  fetchCharacters() {
    return axios.get(`${apiUrl}/wiki/characters`)
  }

  fetchCities() {
    return axios.get(`${apiUrl}/wiki/cities`)
  }

  fetchHouse(id) {
    // return axios.get(`${apiUrl}/wiki/houses?id=${id}`)
    return axios.get(`${apiUrl}/wiki/houses/:id/`) // rap2的坑
  }

  fetchCharacter(id) {
    return axios.get(`${apiUrl}/wiki/characters/:id/`)
  }
}

export default new Services()
