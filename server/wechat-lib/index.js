// 微信异步场景的入口文件 管理微信api地址
import fs from 'fs'
import path from 'path'
import * as _ from 'lodash'
import request from "request-promise"
import formstream from 'formstream'

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: base + 'token?grant_type=client_credential',
  temporary: {
    upload: base + 'media/upload?',
    fetch: base + 'media/get?',
  },
  permanent: {
    upload: base + 'material/add_material?',
    uploadNews: base + 'material/add_news?',
    uploadNewsPic: base + 'media/uploadimg?',
    fetch: base + 'material/get_material?',
    del: base + 'material/del_material?',
    update: base + 'aterial/update_news?',
    count: base + 'material/get_materialcount?',
    batch: base + 'material/batchget_material?'
  }
}

function statFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.stat(filepath, (err, stat) => {
      if (err) reject(err)
      else resolve(stat)
    })
  })
}

export default class Wechat {
  constructor(opts) {
    this.opts = Object.assign({}, opts)
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken
    // 在实例第一次创建时，初始化token
    this.fetchAccessToken()
  }

  async request(options) {
    options = Object.assign({}, options, { json: true })

    try {
      const response = await request(options)
      console.log('wechat-lib/index.js中request函数的response: ', response)
      return response
    } catch (err) {
      console.error(err)
    }
  }

  // 初始化token
  async fetchAccessToken() {
    let data = await this.getAccessToken()

    // token失效或不合法就更新token
    if (!this.isValidAccessToken(data)) {
      data = await this.updateAccessToken()
    }

    await this.saveAccessToken(data)

    return data
  }

  // 首次初始化时数据库没有就用此函数向微信服务器发送请求获取最新token
  async updateAccessToken() {
    const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret
    const data = await this.request({ url })
    const now = (new Date().getTime())
    const expiresIn = now + (data.expires_in - 20) * 1000

    data.expires_in = expiresIn

    return data
  }

  isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false
    }

    const expiresIn = data.expires_in
    const now = (new Date().getTime())

    if (now < expiresIn) {
      return true
    } else {
      false
    }
  }

  async handle(operation, ...args) {
    const tokenData = await this.fetchAccessToken()
    const options = this[operation](tokenData.access_token, ...args)
    const data = await this.request(options)

    return data
  }

  uploadMaterial(token, type, material, permanent) {
    let form = {}
    let url = api.temporary.upload // 临时素材地址

    // 如果是永久素材
    if (permanent) {
      url = api.temporary.upload
      // 把永久素材的属性继承到form表单中
      _.extend(form, permanent)
    }

    if (type === 'pic') {
      url = api.permanent.uploadNewsPic
    }
    // 如果是图文素材
    if (type === 'news') {
      url = api.permanent.uploadNews
      form = material
    } else {
      // from = formsteam()
      form.media = fs.createReadStream(material)
      // const stat = await statFile(material)
      // form.file('media', material, path.basename(material), stat.size)
    }

    //拼接上传url
    let uploadUrl = url + 'access_token=' + token

    if (!permanent) {
      uploadUrl += '&type=' + type
    } else {
      if (type !== 'news') {
        form.access_token = token
      }
      // form.field('access_token', access_token)
    }

    const options = {
      method: 'POST',
      url: uploadUrl,
      json: true
    }

    if (type === 'news') {
      options.body == form
    } else {
      options.formData = form
    }

    return options
  }

  fetchMaterial(token, mediaId, type, permanent) {
    let form = {}
    let fetchUrl = api.temporary.fetch

    if (permanent) {
      fetchUrl = api.permanent.fetch
    }

    let url = fetchUrl + 'access_token=' + token
    let options = { method: 'POST', url: url }

    if (permanent) {
      form.media_id = mediaId
      form.access_token = token
      options.body = form
    } else {
      if (type === 'video') {
        url = url.replace('https://', 'http://')
      }

      url += 'media_id=' + mediaId
    }

    return options
  }

  deleteMaterial(token, mediaId) {
    const form = {
      media_id: mediaId
    }

    const url = api.permanent.del + 'access_token=' + token + '&media_id=' + mediaId

    return { method: 'POST', url: url, body: form }
  }

  updateMaterial(token, mediaId, news) {
    const form = {
      media_id: mediaId
    }

    _.extend(form, news)
    const url = api.permanent.update + 'access_token=' + token + '&media_id=' + mediaId

    return { method: 'POST', url: url, body: form }
  }

  countMaterial(token) {
    const url = api.permanent.count + 'access_token=' + token

    return { method: 'POST', url: url }
  }

  batchMaterial(token, options) {
    options.type = options.type || 'image'
    options.offset = options.offset || 0
    options.count = options.count || 10

    const url = api.permanent.batch + 'access_token=' + token

    return { method: 'POST', url: url, body: options }
  }
}