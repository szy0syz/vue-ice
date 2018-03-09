<template lang="pug">
  .container
    .character-header
      img.background(v-if='character.images' :src='character.images[character.images.length - 1]')
      .media
        img(v-if='character.images' :src='character.images[character.images.length - 1]')
        .desc
         .names
          p.cname {{character.cname}}
          p.name {{character.name}}
      .desc
        .words {{character.words}}
        .name {{character.name}}
    
    .character-body
      .intro
        p(v-for='item in character.intro') {{item}}

      .skills
        img(v-for='(item, index) in character.images', :src='item', :key='index')
      
      .items(v-fro='item in character.sctions')
        .title {{item.title}}
        .body(v-for='text in item.content') {{item}}
</template>

<script>
import {mapState} from 'vuex'
export default {
  head() {
    return {
      title: '家族成员详情'
    }
  },
  computed: {
    ...mapState({
      character: 'currentCharacter'
    })
  },
  beforeCreate() {
    let id = this.$route.query.id
    this.$store.dispatch('fetchCharacter', id)
  }
}
</script>

<style lang="sass" scoped src='static/sass/character.sass'></style>
