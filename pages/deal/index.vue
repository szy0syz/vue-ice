<template lang="pug">
  .container
    .product
      .swiper(v-swiper='swiperConfig')
        .swiper-wrapper
          .swiper-slide(v-for='item in product.images')
            img(:src='item')
        
        .swiper-pagination.swiper-pagination-bullets

      .content
        span.main-price {{product.price.toFixed(2) - product.price.toFixed(2).substr(-3)}}
        span.other-price {{product.price.toFixed(2).substr(-3)}}
      
      .intro {{product.intro}}
      .info
        cell(v-for='(item, index) in product.parameters' :key='index' :title='item.key' :content='item.value')
      .attentions
        .title 购买提示
        ol
          li(v-for='item in attentions') {{item}}

    .product-footer
      span(@click='buyProduct') 购买  
</template>

<script>
import cell from `~components/cell`
import {mapState} from 'vuex'
import { constants } from 'http2';

export default {
  head() {
    return {
      title: '购买页面'
    }
  },
  data () {
    return {
      swiperConfig: {
        autoplay: 4000,
        direction: 'horizontal',
        loop: true,
        pagination: '.swiper-pagination'
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
    ...mapState([
      'product'
    ])
  },
  methods: {
    buyProduct (item) {
      console.log(item)
      console.log('~~Will to but it!!!')
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchProducts')
  },
  components: {
    cell
  }
}
</script>

<style lang="sass" scoped src='static/sass/deal.sass'></style>
