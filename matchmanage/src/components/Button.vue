<template>
  <div class="btn">
    <a :class="classObject" :disabled="disabled">
      <img :src="url" alt>
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["url", "type", "disabled"],
  computed: {
    classObject: function() {
      return {
        danger: this.type == "danger"
      };
    }
  }
};
</script>

<style scoped lang="scss">
.danger {
  background: linear-gradient(#ef5365, #aa0607);
  border: 1px solid rgba($color: #d86e73, $alpha: 1);
}
div {
  display: inline-block;
  border: 1px solid #1d2d38;
  a {
    height: 30px;
    letter-spacing: 1px;
    text-decoration: none;
    border: 1px solid rgba($color: #8ba8ee, $alpha: 1);
    background: linear-gradient(#13a9f0, #4469e2);
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    font-size: 13px;
    font-family: monospace;
    img {
      margin-right: 5px;
    }
  }
  a[disabled]:hover {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.65;

    //pointer-events: none;
  }
}
</style>