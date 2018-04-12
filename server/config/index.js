export default {
  db: 'mongodb://localhost/ice',
  SITE_ROOT_URL: 'http://jerrys.free.ngrok.cc',
  // SITE_ROOT_URL: 'https://ice.jerryshi.com',
  wechat: {
    appID: 'wxf414b2f007bc1f9f',
    appSecret: 'ebad50d9a09d3955599217b8cd82b278',
    token: 'EiDqQkYqwyH!I37E6Hx6LUr$'
  },

  mina: {
    appID: 'wxf414b2f007bc1f9f',
    appSecret: 'ebad50d9a09d3955599217b8cd82b278'
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
  },

  shop: {
    appID: '',
    mchId: '148',
    notifyUrl: 'https://',
    key: 'lf'
  }
}

// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf414b2f007bc1f9f&redirect_uri=https%3A%2F%2Fice.jerryshi.com%2Foauth&response_type=code&scope=snsapi_userinfo&state=&connect_redirect=1&uin=MTM1NjMxNTgyMA%3D%3D&key=3d01690c961c5593085348f3ffec6b321632bf9782a44f6d06f44fa547ce8fd5cd8aecffc306bdec42fb1148b03dc1a8&pass_ticket=FyYjAYThlefK9MUyDbAY3Pa1LqddBTISXwvJZbDibS6/v7a0PNaQTfQ7aL74j8kP2wP9rR/UvtGs7apx/Xfm7A==
