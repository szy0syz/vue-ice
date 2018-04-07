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
      
        .name {{product.title}}
        .intro {{product.intro}}
        .info
          cell(v-for='(item, index) in product.parameters' :key='index' :title='item.key' :content='item.value')
        .attentions
          .title 购买提示
          ol
            li(v-for='item in attentions') {{item}}

    .product-footer
      span(@click='showInfo = true') 购买
    transition(name='slide-top')
      .payment-modal(v-if='showInfo')
        .payment-modal-header
          span 准备购买
          span(@click='showInfo = false') 取消购买
        .payment-modal-body
          .info-item
            img(:src='imageCDN + product.images[0]')
            div
              p {{ product.title }}
              p 价格 ￥{{ product.price }}
          .info-item
            span 收件人
            input(v-model.trim='info.name' placeholder='你的名字')
          .info-item
            span 电话
            inputinput(v-model.trim='info.phoneNumber' type='tel' placeholder='你的电话')
          .info-item
            span 地址
            inputinput(v-model.trim='info.address' type='tel' placeholder='你的收货地址')
        .payment-modal-footer(@click='handlePayment') 确认支付
    transition(name='fade')
      span.model(v-if='model.visible') {{modal.content}}
</template>

<script>
import cell from '../../components/cell'
import { mapState } from 'vuex'
import wechat from '~static/mixins/wechat'

function toggleModal(obj, content) {
  clearTimeout(obj.timer)
  obj.visible = true
  obj.content = content
  obj.timer = setTimeout(() => {
    obj.visible = false
  }, 1500);
}

export default {
  middleware: 'wechat-auth',
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
      ],

      showInfo: false,  // 弹出模态框

      info: {
        name: '',
        phoneNumber: '',
        address: ''
      },

      modal: {
        visible: false,
        content: '成功',
        timer: null
      }
    }
  },
  computed: {
    ...mapState({
      product: 'currentProduct'
    })
  },

  methods: {
    async handlePayment() {
      const that = this
      const {
        name,
        address,
        phoneNumber
      } = this.info

      if (!name || !address || !phoneNumber) {
        toggleModal(this.modal, '收货信息忘记填了？')

        return
      }

      const res = await this.$store.dispatch('ceateOrder', {
        productId: this.product._id,
        name,
        address,
        phoneNumber
      })

      if (!res.order) {
        toggleModal(this.modal, '服务器异常，请稍后再试。')
        
        return
      }

      window.wx.chooseWXPay({
        
      })

    }
  },

  mixins: [wechat],

  async beforeMount() {
    const id = this.$route.query._id

    this.$store.dispatch('fetchProduct', id)

    const url = window.location.href
    
    await this.wechatConfig(url)
  },
  components: {
    cell
  }
}
</script>

<style lang="sass" scoped src='static/sass/deal.sass'></style>
