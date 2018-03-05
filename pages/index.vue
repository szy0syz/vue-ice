<template lang="pug">
  .container
    .house(ref='house')
      .house-items(v-for='(item, index) in houses' :key='index' @click='showHouse(item)')
        .house-text
          .words {{ item.words }}
          .cname {{ item.name }}
          .name {{ item.cname }}
    
    .character
      .title 主要人物
      .container
        .character-items(v-for='(item, index) in characters' :key='index' @click='showCharacter(item)')
          img(:src='item.profile')
          .desc 
            .cname {{item.cname}}
            .name {{item.name}}
            .palyedBy {{item.playedBy}}
    
    .city
      .titel 维斯特洛
      .intro 坐落於已知世界的最西端，狭长的维斯特洛大陆由北部的极地冰盖起向南延绵约3,000英里。绝境长城是一座巍峨挺立的不可逾越之物，横跨300英里，将最北的塞外地区与七大王国相互分离。一个统一的政治实体领导着南方的广阔土地，并形成九块相互联系又相互割据的区域。
      .item(v-for='(item, index) in cities' :key='index')
        .title {{item.title}}
        .body {{item.body}}
</template>
<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '冰火脸谱'
    }
  },
  computed: {
    // 映射 this.xxx 为 store.state.xxx
    ...mapState(['houses', 'characters', 'cities'])
  },
  method: {
    showHouse(item) {
      // 前端路由跳转到house，附带查询查询参数_id
      this.$router.push({
        path: '/house',
        query: {
          id: item._id
        }
      })
    },
    showCharacter(item) {
      this.$router.push({
        path: '/character',
        query: {
          id: item._id
        }
      })
    }
  },
  beforeCreate() {
    // 创建页面前加载数据
    this.$store.dispatch('fetchHouses')
    this.$store.dispatch('fetchCharacters')
    this.$store.dispatch('fetchCities')
  }
}
</script>

<style scoped>
.title {
  margin: 50px 0;
}
</style>
