<template>
  <section class="container">
    <img src="../static/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    
  </section>
</template>
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
