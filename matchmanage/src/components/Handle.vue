<template>
  <a href="javascript:;" :disabled="disabled" :style="type=='danger' ? {color: 'red'} : {color: '#17a2c8'}">
    <img :src="url" alt="">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: ['url', 'type', 'disabled']
  }
</script>

<style scoped lang="scss">
  a {
    height: 28px;
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    letter-spacing: 1px;
    margin: 0 5px;
    img {
      margin-right: 3px;
    }
  }
  a[disabled]:hover{
      cursor: not-allowed;
      box-shadow: none;
      opacity: .65;
  }
  a[disabled] {
    pointer-events: none;
  }
</style>
