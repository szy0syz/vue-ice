export default {
  db: 'mongodb://localhost/ice',
  SITE_ROOT_URL: 'https://ice.jerryshi.com',
  wechat: {
    appID: 'wxf414b2f007bc1f9f',
    appSecret: 'ebad50d9a09d3955599217b8cd82b278',
    token: 'EiDqQkYqwyH!I37E6Hx6LUr$'
  },

  qiniu: {
    AK: 'OiUlP0RxLh1eN318uvFvX4AyHeRfAGOiPmnNwdGx',
    SK: 'Meii5goUxxczCkctM3vM3dgdQTU5r7YwOzHeIocE',
    bucket: 'vue-ice',
    qiniuURL: 'p5wfod7im.bkt.clouddn.com',
    config: {
      useCdnDomain: true
      // region: 'z0' // 华东z0 (华南:z2)
    }
  }
}
