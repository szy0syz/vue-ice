<template lang="pug">
  .cell
    span {{title}}
    span(v-if='content') {{content}}
    
</template>
<script>
export default {
  props: {
    title: String,
    content: String
  }
}
</script>

<style scoped lang="sass">
</style>
