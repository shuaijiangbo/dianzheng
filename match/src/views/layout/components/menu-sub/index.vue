<template>
  <el-submenu :index="menu.path">
    <template slot="title">
      <i v-if="menu.icon" :class="`iconfont ${menu.icon}`"></i>
      <i v-if="menu.icon === undefined & !menu.iconSvg" class="fa fa-folder-o"></i>
      <span slot="title">{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <match-menu-item v-if="child.children === undefined" :menu="child" :key="childIndex"></match-menu-item>
      <match-menu-sub v-else :menu="child" :key="childIndex"/>
    </template>
  </el-submenu>
</template>

<script>
import MatchMenuSub from '../menu-item'
export default {
  name: 'match-menu-sub',
  components: {
    'match-menu-item': MatchMenuSub
  },
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
