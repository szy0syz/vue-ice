// 暴露一个对象，通过这个mixin可以让当前暴露出去的这个对象在多个页面中公用这个方法
export default {
  methods: {
    async wechatInit(url) {
      // 在服务器端针对传入的url地址进行加密操作，然后把签名值返回给前端
      const res = await this.$store.dispatch('getWechatSignature', url)

      const { data, success } = res.data

      if (!success) throw new Error('不能成功获取服务器签名!')

      const wx = window.wx
      console.log('~~~!!!!!!data:')
      console.log(data)
      wx.config({
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        debug: true,
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'previewImage',
          'hideAllNonBaseMenuItem',
          'showMenuItems',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'chooseWXPay'
        ] // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
      })

      wx.ready(() => {
        // 对微信的按钮进行初始化
        // this.wechatSetMenu()
        // this.wechatShare({})
      })

      wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log('~~~yyyy!!!!!!')
        console.log(res)
      })
    }
  }
}
