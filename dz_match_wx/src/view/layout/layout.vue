<template>
  <div class="bs-wp">
    <div class="content-wp">
      <router-view></router-view>
    </div>
    <comFooter></comFooter>
  </div>
</template>

<script>
  import comFooter from './comFooter';

  export default {
    name: "layout",
    data() {
      return {

      }
    },
    components: {comFooter}
  }
</script>

<style scoped lang="scss">
  .content-wp{
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: auto;
  }
</style>
