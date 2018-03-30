<template lang="pug"></template>

<script>
export default {
  head() {
    return {
      title: '授权页面'
    }
  },
  beforeMount() {
    const url = window.location.href

    this.$store.dispatch('getUserByOAuth', encodeURIComponent(url)).then(res => {
      if (res.data.success) {
        console.log('~~res.data', res.data)
      }
    })
  }
}
</script>
