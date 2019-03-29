<template>
  <button
    class="lp-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :class="[
      type ? 'lp-button--' + type : '',
      buttonSize ? 'lp-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="`iconfont ${icon}`" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'lp-button',
  inject: {
    lpForm: {
      default: '',
    },
    lpFormItem: {
      default: '',
    },
  },
  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: String,
    icon: {
      type: String,
      default: '',
    },
    loading: Boolean,
    disabled: Boolean,
  },

  computed: {
    _lpFormItemSize () {
      return (this.lpFormItem || {}).elFormItemSize
    },
    buttonSize () {
      return this.size || this._lpFormItemSize || (this.$LIUPENG ||　{}).size
    },
    buttonDisabled () {
      return this.disabled || (this.lpForm || {}).disabled
    }
  },

  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style scoped lang="scss">
 // 按钮大小样式
 button {
   position: relative;
   outline: none;
   border: 1px solid #000;
   text-align: center;
   width: 87px;
   height: 31px;
   line-height: 29px;
   font-size: 13px;
   cursor: pointer;
   color: #fff;
   background: linear-gradient(#f29a33, #ec621c);
   box-sizing: border-box;
   padding: 0;
   transition: .1s;
   &:hover {
     border-color: transparent;
     background: mix(#fff, #ec621c, 10%) !important;
   }
   i {
     vertical-align: middle;
   }
   &:after {
     content: '';
     width: calc(100% - 2px);
     position: absolute;
     top: 0px;
     border: 1px solid rgba(256, 256, 256, 0.5);
     left: 0px;
     height: calc(100% - 2px);
   }
 }
.lp-button--primary {
  background: linear-gradient(#10adef, #4469e2);
  &:hover {
    border-color: transparent;
    background: mix(#fff, #4469e2, 10%) !important;
  }
}
.lp-button--delete {
  background: linear-gradient(#34b5e9, #377ec1);
  &:hover {
    border-color: transparent;
    background: mix(#fff, #377ec1, 10%) !important;
  }
}
.lp-button--success {
  background: linear-gradient(#97cb72, #57b534);
  &:hover {
    border-color: transparent;
    background: mix(#fff, #57b534, 10%) !important;
  }
}
.lp-button--danger {
  background: linear-gradient(#e85f6c, #9e2324);
  &:hover {
    border-color: transparent;
    background: mix(#fff, #9e2324, 10%) !important;
  }
}
.lp-button--text {
  color: #fff;
  background: transparent;
  border: 1px solid transparent !important;  //自定义边框
  &:hover {
    border-color: transparent;
    border: 1px solid transparent !important;  //自定义边框
    background-color: transparent !important;
    color: #f29a33;
  }
  &:after {
    opacity: 0;
  }
}
.lp-button--mini {
  width: 93px;
  height: 31px;
  line-height: 29px;
  font-size: 13px;
}
.lp-button--medium {
  width: 110px;
  height: 35px;
  line-height: 33px;
  font-size: 14px;
}
.is-disabled {
  border-color: transparent;
  cursor: not-allowed;
}
.is-loading {
  border-color: transparent;
  background: mix(#fff, #ec621c, 10%) !important;
  cursor: default;
}
</style>
