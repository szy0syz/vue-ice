<template lang="pug">
  .container
    .user(v-if='user')
      .header
        .header-text {{user.nickname}}
        img(:src='user.avatar')
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
          img(:src='item.image')
          .order-indtro
            .title {{item.title}}
            .content {{item.intro}}
          .order-price
            span {{item.price}}
</template>
<script>
import cell from '../../components/cell'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '个人账户'
    }
  },
  computed: {
    ...mapState(['user'])
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
