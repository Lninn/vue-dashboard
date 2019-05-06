<template>
  <div class="register-main">
    <a-form :form="form" class="register-form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [
                {
                  required: true,
                  message: '请输入你的用户名',
                },
              ],
            },
          ]"
          placeholder="邮箱"
        >
          <a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入你的密码' }],
            },
          ]"
          type="password"
          placeholder="至少6为密码，区分大小写"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入你的密码' }],
            },
          ]"
          type="password"
          placeholder="确认密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
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
        <router-link to="/user/login">马上去登陆</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.register-main {
  width: 388px;
  margin: 0 auto;
  .register-form {
    input {
      font-size: 16px;
      height: 41px;
    }
    .register-form-button {
      width: 100%;
      height: 40px;
      font-size: 16px;
    }
  }
}

.register-main .ant-tabs-nav-wrap {
  text-align: center;
}
</style>
