<template lang="pug">
  .container
    .product
      .swiper(v-swiper:jSwiper='swiperConfig')
        .swiper-wrapper
          .swiper-slide(v-for='item in product.images')
            img(:src='"http://p5wfod7im.bkt.clouddn.com/" + item')
        .swiper-pagination.swiper-pagination-bullets

      .content
        .price(v-if='product.price')
          span.main-price {{Number(product.price).toFixed(2) - Number(product.price).toFixed(2).substr(-3)}}
          span.other-price {{Number(product.price).toFixed(2).substr(-3)}}
      
        .name {{product.name}}
        .intro {{product.intro}}
        .info
          cell(v-for='(item, index) in product.parameters' :key='index' :title='item.key' :content='item.value')
        .attentions
          .title 购买提示
          ol
            li(v-for='item in attentions') {{item}}

    .product-footer
      span(@click='buyProduct(product)') 购买
</template>

<script>
import cell from '../../components/cell'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '购买页面'
    }
  },
  data() {
    return {
      swiperConfig: {
        autoplay: 4000,
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      },

      attentions: [
        '商品和服务的差异',
        '清关服务',
        '物流服务',
        '需要更多帮助，请联系管路员'
      ]
    }
  },
  computed: {
    ...mapState({
      product: 'currentProduct'
    })
  },
  methods: {
    buyProduct(item) {
      console.log(item)
      console.log('~~Will to but it~~~')
    }
  },
  beforeCreate() {
    const id = this.$route.query._id
    console.log(id)
    this.$store.dispatch('fetchProduct', id)
  },
  components: {
    cell
  }
}
</script>

<style lang="sass" scoped src='static/sass/deal.sass'></style>
