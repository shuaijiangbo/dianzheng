<template>
  <el-menu-item :index="menu.path">
    <i v-if="menu.icon" :class="`iconfont ${menu.icon}`"></i>
    <i v-if="menu.icon === undefined & !menu.iconSvg" class="fa fa-file-o"></i>
    <span slot="title">{{menu.title || '未命名菜单'}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'match-menu-item',
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
}
</script>

<style scoped lang="scss">
</style>
