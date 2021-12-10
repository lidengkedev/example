<template>
  <div>
    <pages-link :data="pagesLink"></pages-link>
  </div>
</template>

<script>
import PagesLink from './components/menu/page-link.vue'
export default {
  components: {
    PagesLink
  },
  data() {
    return {
      pagesLink: [
        { src: '../example/indexedDB.html', title: 'IndexedDB 操作' },
        { src: '../example/flex.html', title: 'Flex 布局' }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
