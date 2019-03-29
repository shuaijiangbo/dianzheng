<template>
  <div class="steps">
    <ul>
      <li v-for="(step, index) in steps" :key="index">
        <div :style="index > active ? defaultStyle : activeStyle" class="content">
          <div class="number">{{ index + 1 }}</div>
          <div class="title">{{ step }}</div>
        </div>
        <img :src="index > active ? require('@/assets/copyb.png') : require('@/assets/copyo.png')" alt="">
      </li>   
    </ul>
  </div>
</template>

<script>
export default {
  name: 'match-steps',
  props: {
    steps: {
      type: Array,
      require: true
    },
    active: {

    }
  },
  data() {
    return {
      defaultStyle: {
        background: 'url(' + require('@/assets/Gradientt.png') + ')',
      },
      activeStyle: {
        background: 'url(' + require('@/assets/Gradient.png') + ')',
      }
    }
  },
  methods: {
    jumpStep (e) {
      function getChildrenIndex(ele){ 
        var i = 0; 
        while(ele = ele.previousElementSibling){ 
          i++; 
        }
        return i; 
      }
      if (getChildrenIndex(e.currentTarget.parentElement) < this.active) {
        this.$emit('update:active', getChildrenIndex(e.currentTarget.parentElement))
      }
    }
  }
}
</script>

<style scoped lang="scss">
.steps {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 171px;
    li {
      &:last-child img{
        display: none;
      }
      img {
        margin: 7px 16px;
      }
      .content {
        height: 43px;
        position: relative;
        cursor: default;
        div {
          position: absolute;
        }
        .number {
          font-size: 30px;
          color: #fff;
          left: 22px;
          top: 3px;
        }
        .title {
          color: #fff;
          font-size: 20px;
          left: 70px;
          top: 5px;
        }
      }
    }
  }
}
</style>
