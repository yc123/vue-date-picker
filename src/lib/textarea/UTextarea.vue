<template>
  <div class="com-textarea-box">
    <textarea
      ref="comTextarea"
      :class="{error: !isValid}"
      class="base-textarea"
      :placeholder="placeholder"
      @blur="onBlur"
      @keyup.enter="enterEvent"
      @input="onInput($event)">
  </textarea>
    <i class="counter" v-if="maxLength">{{lastValue.length}}/{{maxLength}}字</i>
  </div>
</template>
<script>
  export default {
    name: 'UTextarea',
    data () {
      return {
        lastValue: '',
        isValid: true
      }
    },
    props: {
      // 正则输入校验
      reg: {
        type: String,
        default: ''
      },
      // 正则合法性校验
      checkReg: {
        type: String,
        default: null
      },
      // 绑定值
      value: {
        default: ''
      },
      // 最大字数
      maxLength: {
        type: Number,
        default: null
      },
      boxType: {
        type: String,
        default: 'input'
      },
      placeholder: {
        type: String,
        default: ''
      },
      //验证
      rule: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    watch: {
      value: {
        handler: function (val) {
          this.$nextTick(() => {
            this.$refs.comTextarea.value = val || ''
            this.lastValue = val || ''
          })
        },
        immediate: true
      }
    },
    methods: {
      // 监听回车
      enterEvent (e) {
        let target = e.target || e.srcElement
        target.blur()
      },
      onInput (e) {
        // 输入限制正则校验
        if (this.reg) {
          let regExp = new RegExp(this.reg)
          if (!regExp.test(e.target.value)) {
            e.target.value = this.lastValue
          }
        }
        if (this.checkReg) {
          let checkRegExp = new RegExp(this.checkReg)
          this.isValid = checkRegExp.test(this.$refs.comInput.value)
        }
        // 最大字数校验
        if (this.maxLength) {
          if (e.target.value.length > this.maxLength) {
            e.target.value = e.target.value.substr(0, this.maxLength)
          }
        }
        this.$emit('input', e.target.value)
        this.lastValue = e.target.value
      },
      customRuleCallback (error) {
        if (error) {
          this.isValid = false
        } else {
          this.isValid = true
        }
      },
      // 失焦校验
      onBlur (e) {
        if (this.rule.trigger === 'blur') {
          debugger
          this.rule.validator(this.rule, e.target.value, this.customRuleCallback)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  $base-color: #3597D5;
  $err-color: #DB3725;
  .com-textarea-box {
    position: relative;
    height: 88px;
    .base-textarea {
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      border-radius: 4px;
      padding: 5px 8px 20px;
      resize: none;
      line-height: 23px;
      width: 100%;
      height: 100%;
      outline: none;
      &:focus {
        border-color: $base-color;
      }
      &.error {
        border-color: $err-color;
      }
    }
    .counter {
      position: absolute;
      right: 10px;
      bottom: -24px;
      line-height: normal;
      font-size: 12px;
      color: #DE7815;
    }
  }
</style>
