<template lang="pug">
  .container
    .user(v-if='user')
      .header
        .header-text {{user.nickname}}
        img(:src='imageCDN + user.avatarUrl + "?imageView2/1/format/jpg/q/75/imageslim"')
      .address
        cell(title='收货地址')
        .user-content {{user.address}}
      .phone
        cell(title='电话')
        .user-content {{user.phoneNumber}}
      .name
        cell(title='姓名')
        .user-content {{user.name}}

      .order(v-if='user.orders && user.orders.length > 0')
        cell(title='我的订单')
        .order-items(v-for='(item, index) in user.orders' :key='index')
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
    ...mapState(['user', 'imageCDN'])
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
