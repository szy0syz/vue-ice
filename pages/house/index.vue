<template lang="pug">
  .container
    .house-media
      img(v-if='house.cname' :src='imageCDN + house.cname')
      .desc
        .words {{house.words}}
        .name {{house.name}}
          
    .house-body
      .title {{house.cname}}
      .body {{house.intro}}
      .title 主要角色
      .body(v-for='(item, index) in house.swornMembers' :key='index')
        .members(v-if='item.character')
          img(:src='imageCDN + item.character.profile + "?imageView2/1/w/280/h/440/format/jpg/q/75|imageslim"' @click='showCharacter(item)')
          .desc
            .cname {{item.character.cname}}
            .intro {{item.text}}
    
    .house-history(v-for='(item, index) in house.sections' :key='index')
      .title {{item.title}}
      .body(v-for='text in item.content') {{text}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  head() {
    return {
      title: '家族详情'
    }
  },
  computed: {
    ...mapState({
      house: 'currentHouse',
      imageCDN: 'imageCDN'
    })
  },
  methods: {
    showCharacter(item) {
      console.log(item)
      this.$router.push({
        path: '/character',
        query: {
          id: item.character.nmId
        }
      })
    }
  },
  beforeCreate() {
    let id = this.$route.query.id

    this.$store.dispatch('fetchHouse', id)
  }
}
</script>

<style lang="sass" scoped src='static/sass/house.sass'></style>
