<template>
  <section class="container">
    <img src="../static/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    
  </section>
</template>
<script>
// import { mapState } from 'vuex'
// import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants'
export default {
  head() {
    return {
      title: '测试页面'
    }
  },
  beforeMount() {
    const wx = window.wx
    const url = window.location.href

    this.$store.dispatch('getWechatSignature', encodeURIComponent(url)).then(res => {
      if (res.data.success) {
        const params = res.data.params

        wx.config({
          debug: true,
          appId: params.appId,
          timestamp: params.timestamp,
          noceStr: params.nocestr,
          signature: params.signature,
          jsApiList: [
            'previewImage',
            'chooseImage',
            'uploadImage',
            'downloadImage',
            'onMenuShareTimeline',
            'showAllNonBaseMenuItem',
            'hideAllNonBaseMenuItem',
            'showMenuItems'
          ]
        })

        wx.ready(() => {
          wx.hideAllNonBaseMenuItem()
          console.log('success')
        })
      }
    })
  }
}
</script>

<style scoped>
.title {
  margin-top: 50px;
}
.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button {
  margin-top: 50px;
}
</style>
