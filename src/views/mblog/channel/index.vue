<template>
  <div>
    {{routerName}}
  </div>
</template>

<script>
  export default {
    name: "index",
    computed: {
      routerName() {
        const { name } = this.$route
        return name
      }
    }
  }
</script>

<style scoped>

</style>
