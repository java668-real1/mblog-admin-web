<template>
  <div>
    {{ routerName }}
  </div>
</template>

<script>
export default {
  name: 'Index',
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
