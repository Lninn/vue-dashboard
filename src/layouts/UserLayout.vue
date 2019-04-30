<template>
  <a-layout class="user-layout-container">
    <a-layout-header class="user-layout-lang">
      <a-dropdown :style="{ marginRight: '24px' }" @visibleChange="langChange">
        <a class="ant-dropdown-link" href="#">
          <a-icon class="lang-circle" :type="circleType" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">中文</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">英文</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px' }">
        <div class="content-top">
          <div class="content-top-header">
            <span>Ant Design</span>
          </div>
          <div class="content-top-desp">
            Ant Design 是西湖区最具影响力的 Web 设计规范
          </div>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      circleType: 'right-circle',
    }
  },
  methods: {
    langChange(visible) {
      this.circleType = visible ? 'down-circle' : 'right-circle'
    },
  },
}
</script>

<style lang="less" scoped>
.user-layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5;
  .content-top {
    display: flex;
    align-items: center;
    flex-direction: column;
    .content-top-header {
      span {
        font-size: 33px;
      }
    }
    .content-top-desp {
      margin-top: 10px;
      margin-bottom: 40px;
    }
  }
}

.user-layout-lang {
  width: 100%;
  height: 40px;
  line-height: 44px;
  text-align: right;
  background-color: #ffffff;
  padding: 0;
  .lang-circle {
    font-size: 20px;
  }
}
</style>
