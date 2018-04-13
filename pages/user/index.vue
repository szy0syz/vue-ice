<template lang="pug">
  .container
    .user(v-if='authUser')
      .header
        .header-text {{authUser.nickname}}
        img(:src='imageCDN + authUser.avatarUrl + "?imageView2/1/format/jpg/q/75/imageslim"')
      .address
        cell(title='收货地址')
        .user-content {{authUser.address}}
      .phone
        cell(title='电话')
        .user-content {{authUser.phoneNumber}}
      .name
        cell(title='姓名')
        .user-content {{authUser.name}}

      .order(v-if='authUser.orders && authUser.orders.length > 0')
        cell(title='我的订单')
        .order-items(v-for='(item, index) in payments' :key='index')
          img(:src='imageCDN + item.product.images[0] + "?imageView2/1/format/jpg/q/75/imageslim"')
          .order-indtro
            .title {{item.product.title}}
            .content {{item.product.intro}}
          .order-price
            span {{item.product.price}}
</template>
<script>
import cell from '../../components/cell'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '个人中心'
    }
  },
  computed: {
    ...mapState(['authUser', 'imageCDN'])
  },
  methods: {},
  beforeCreate() {
    this.$store.dispatch('fetchUserAndOrders')
  },
  components: {
    cell
  }
}
</script>

<style scoped lang="sass" src='static/sass/user.sass'></style>
