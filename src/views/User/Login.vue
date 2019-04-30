<template>
  <div class="login-main">
    <a-tabs defaultActiveKey="1" @change="handleTabChange">
      <a-tab-pane tab="账户密码登陆" key="1"></a-tab-pane>
      <a-tab-pane tab="手机号登陆" key="2"></a-tab-pane>
    </a-tabs>
    <a-form :form="form" class="login-form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [{ required: true, message: '请输入你的用户名' }],
            },
          ]"
          :placeholder="activeTabKey === '1' ? '用户名' : '手机号'"
        >
          <a-icon
            slot="prefix"
            :type="activeTabKey === '1' ? 'user' : 'mobile'"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          :style="{ width: activeTabKey === '1' ? '' : '240px' }"
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入你的密码' }],
            },
          ]"
          type="password"
          :placeholder="activeTabKey === '1' ? '密码' : '验证码'"
        >
          <a-icon
            slot="prefix"
            :type="activeTabKey === '1' ? 'lock' : 'mail'"
            style="color: rgba(0, 0, 0, .25)"
          />
        </a-input>
        <a-button
          v-if="activeTabKey === '2'"
          style="margin-left: 30px;font-size: 16px"
          :disabled="captchaBtn"
          @click.stop="getCaptcha"
          >{{ captchaBtn ? captchaBtnText + ' 秒' : captchaBtnText }}</a-button
        >
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          记住密码
        </a-checkbox>
        <a class="login-form-forgot" href="">
          忘记密码 ?
        </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登陆
        </a-button>
        <a href="">
          马上去注册
        </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTabKey: '1',
      captchaBtn: false,
      captchaBtnText: '获取验证码',
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleTabChange(key) {
      this.activeTabKey = key
    },
    getCaptcha() {
      this.captchaBtn = true
      this.captchaBtnText = 120
      this.captchaTimer = setInterval(() => {
        this.captchaBtnText -= 1
        if (parseInt(this.captchaBtnText) <= 0) {
          this.captchaBtn = false
          this.captchaBtnText = '获取验证码'
          clearInterval(this.captchaTimer)
        }
      }, 1000)
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
}
</script>

<style lang="less">
.login-main {
  width: 388px;
  margin: 0 auto;
  .login-form {
    input {
      font-size: 16px;
      height: 41px;
    }
    .login-form-button {
      width: 100%;
      height: 40px;
      font-size: 16px;
    }
  }
}

.login-main .ant-tabs-nav-wrap {
  text-align: center;
}
</style>
