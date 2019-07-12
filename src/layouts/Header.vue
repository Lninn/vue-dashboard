<template>
  <div class="header">
    <a-dropdown :trigger="['hover']" placement="bottomLeft">
      <div class="avator">
        <span class="avator-img">
          <img src="../assets/avatar.png" alt="" />
        </span>
        <span class="avator-name">John Sms</span>
      </div>
      <a-menu slot="overlay">
        <a-menu-item key="0">
          <div style="display: inline-block;">
            <a-icon type="user" style="min-width: 12px; margin-right: 8px;" />
            <a @click="noFunc" style="color: rgba(0, 0, 0, 0.65);">个人中心</a>
          </div>
        </a-menu-item>
        <a-menu-item key="1">
          <div style="display: inline-block;">
            <a-icon
              type="setting"
              style="min-width: 12px; margin-right: 8px;"
            />
            <a @click="noFunc" style="color: rgba(0, 0, 0, 0.65);">个人设置</a>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <div style="display: inline-block;">
            <a-icon type="logout" style="min-width: 12px; margin-right: 8px;" />
            <a
              href="javascript:;"
              @click="handleLogout"
              style="color: rgba(0, 0, 0, 0.65);"
              >退出登陆</a
            >
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('app', ['Logout']),

    noFunc() {
      this.$notification.open({
        message: '提示',
        description: '功能暂未开发，请联系管理员',
        placement: 'bottomRight',
        onClick: () => {
          console.log('Notification Clicked!')
        },
      })
    },

    handleLogout() {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message,
              })
            })
        },
        onCancel() {},
      })
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  float: right;
  height: 100%;
  margin-right: 30px;
  .avator {
    display: inline-block;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    .avator-img {
      width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 50%;
      position: relative;
      display: inline-block;
      overflow: hidden;
      margin: 20px 8px 20px 0;
      color: #1890ff;
      vertical-align: top;
      font-feature-settings: 'tnum';
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .avator-name {
      margin: 0;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      background-color: #fff;
      font-feature-settings: 'tnum';
    }
  }
}
</style>
