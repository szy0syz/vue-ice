<template lang="pug"></template>

<script>
function getUrlParam(param) {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  const result = window.location.search.substr(1).match(reg)
  console.log('getUrlParam')
  console.log(result)
  return result ? decodeURIComponent(result[2]) : null
}

export default {
  head() {
    return {
      title: 'loding...(oauth.vue)'
    }
  },
  async beforeMount() {
    const url = window.location.href
    const { data } = await this.$store.dispatch('getWechatOAuth', url)
    console.log('beforeMount -- data: ~~~~~~')
    console.log(data)

    if (data.success) { // 更新用户信息
      console.log('进入到了data.success中~~~~~')
      await this.$store.dispatch('setAuthUser', data.data)
      const paramsArr = getUrlParam('state').splite('_')
      console.log('paramsArr:~~', paramsArr)
      const visit = paramsArr.length === 1 ? `/${paramsArr[0]}` : `/${paramsArr[0]}?id=${paramsArr[1]}`

      this.$router.replace(visit)
    } else {
      throw new Error('用户信息获取失败')
    }

    // this.$store.dispatch('getUserByOAuth', encodeURIComponent(url)).then(res => {
    //   if (res.data.success) {
    //     console.log('~~res.data', res.data)
    //   }
    // })
  }
}
</script>
