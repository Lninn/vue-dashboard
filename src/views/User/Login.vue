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
            'username',
            {
              rules: [
                {
                  required: true,
                  message: '请输入你的用户名',
                  validator: validateToUserInfo,
                },
              ],
              validateTrigger: 'blur',
              validateFirst: true,
            },
          ]"
          :placeholder="activeTabKey === '1' ? '用户名/邮箱' : '手机号'"
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
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >
          登陆
        </a-button>
        <router-link to="/user/register">马上去注册</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { emailRe, phoneRe } from '../../utils'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      activeTabKey: '1',
      captchaBtn: false,
      captchaBtnText: '获取验证码',
      customActiveKey: 'tab1',
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 1,
        smsSendBtn: false,
      },
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    ...mapActions('app', ['Login']),

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
    validateToUserInfo(rule, value, callback) {
      // 验证用户账户的合法性

      if (value.toString().indexOf('@') > 0) {
        // 邮箱
        if (emailRe.test(value)) {
          callback()
        } else {
          callback('请输入合法的邮箱')
        }
      } else if (value.length === 11) {
        // 手机
        if (phoneRe.test(value)) {
          callback()
        } else {
          callback('请输入合法的手机号码')
        }
      } else {
        // 用户名
        if (value.length < 3 || value.length > 12) {
          callback('请输入合法的用户名')
        } else {
          callback()
        }
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login,
      } = this

      state.loginBtn = true

      const validateFieldsKey =
        customActiveKey === 'tab1'
          ? ['username', 'password']
          : ['mobile', 'captcha']

      console.log(validateFieldsKey)
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          // 因为现在后端没有加密的操作，所以暂时不加密
          // loginParams.password = md5(values.password)
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },

    loginSuccess() {
      this.$router.push({ name: 'Home' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `登陆成功，欢迎回来`,
        })
      }, 1000)
    },

    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description:
          ((err.response || {}).data || {}).message ||
          '登陆信息输入错误，请重试',
        duration: 4,
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
