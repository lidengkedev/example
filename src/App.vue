<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.i-button {
  padding: 8px 15px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  outline: none;
  background-color: transparent;
}
.i-button[type='primary'] {
  border-color: #409EFF;
  background-color: #409EFF;
}
.i-button .link {
  color: #fff;
}
</style>
