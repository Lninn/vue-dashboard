<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'" />
        </div>
      </template>
      <div>
        <div>
          <h2>整体风格定制</h2>
          <a-radio-group
            @change="e => handleSettingChange('navTheme', e.target.value)"
            :value="$route.query.navTheme || 'drak'"
          >
            <a-radio value="dark">黑色</a-radio>
            <a-radio value="light">白色</a-radio>
          </a-radio-group>
          <h2>导航布局</h2>
          <a-radio-group
            @change="e => handleSettingChange('navLayout', e.target.value)"
            :value="$route.query.navLayout || 'left'"
          >
            <a-radio value="left">左侧</a-radio>
            <a-radio value="top">顶部</a-radio>
          </a-radio-group>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    onClose() {
      this.visible = false
    },

    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } })
    },
  },
}
</script>

<style scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  font-size: 20px;
  width: 48px;
  height: 48px;
  text-align: center;
  background: #40a9ff;
  color: #ffffff;
  line-height: 48px;
}
</style>
