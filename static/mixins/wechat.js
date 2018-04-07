// 暴露一个对象，通过这个mixin可以让当前暴露出去的这个对象在多个页面中公用这个方法
export default {
  methods: {
    async wechatInit(url) {
      // 在服务器端针对传入的url地址进行加密操作，然后把签名值返回给前端
      const res = await this.$store.dispatch('getWechatSignature', url)

      const { data, success } = res.data

      if (!success) throw new Error('不能成功获取服务器签名!')

      const wx = window.wx

      wx.config({
        debug: true,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: [
          'previewImage',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'chooseWXPay'
        ]
      })

      wx.ready(() => {
        // 对微信的按钮进行初始化
        this.wechatSetMenu()

        this.wechatShare({})
      })
    }
  }
}
