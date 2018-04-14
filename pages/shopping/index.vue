<template lang="pug">
  .container
    .shopping
      .title 权游周边
      .list
        .items(v-for='(item, index) in products' :key='index' @click='showProduct(item)')
          img(:src='"http://p5wfod7im.bkt.clouddn.com/" + item.images[0]')
          .body
            .title {{item.title}}
            .content {{item.intro}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'wechat-auth',
  head() {
    return {
      title: '手办商城'
    }
  },
  computed: {
    ...mapState([
      'products',
      'imageCDN'
    ])
  },
  methods: {
    showProduct(item) {
      this.$router.push({
        path: '/deal',
        query: {
          _id: item._id
        }
      })
    }
  },

  beforeCreate() {
    let id = this.$route.query.id
    this.$store.dispatch('fetchProducts', id)
  },

  beforeDestroy() {
    // 离开前获取当前滚动值
    console.log('$el.scrollTop: ', this.$el.scrollTop)
  }
}
</script>

<style lang="sass" scoped src='static/sass/shopping.sass'></style>
