<template>
  <div class="home">
    <div class="flex-row">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <div class="gutter-box">col-16</div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">col-8</div>
        </a-col>
      </a-row>
    </div>
    <div class="flex-row">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">col-8</div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">col-8</div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">col-8</div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.home {
  height: 100%;

  .flex-row {
    height: 50%;
    padding: 5px;
  }
}

.home /deep/ .ant-row {
  height: 100%;
}

.home /deep/ .ant-row > div {
  background: transparent;
  border: 0;
}

.gutter-row {
  height: 100%;
}

.gutter-box {
  height: 100%;
  background: #00a0e9;
  padding: 5px 0;
}
</style>
