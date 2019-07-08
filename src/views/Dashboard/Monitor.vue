<template>
  <div class="home">
    <div class="flex-row-top">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <div class="gutter-box gutter-map">
            <div class="amap-wrapper">
              <el-amap
                ref="map"
                vid="amapDemo"
                :amap-manager="amapManager"
                :center="center"
                :zoom="zoom"
                :plugin="plugin"
                :events="events"
                class="amap-demo"
              >
              </el-amap>
            </div>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box gutter-monitor-box">
            <span>展示监测点数据信息</span>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="flex-row-bottom">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box gutter-river-box">
            <span>展示河道数据信息</span>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">col-8</div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box gutter-img-box">
            <span>
              <img :src="img1" alt="监测点图片" />
            </span>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import img1 from '@/assets/img-1.jpg'
import { AMapManager } from 'vue-amap'

let amapManager = new AMapManager()

export default {
  data() {
    return {
      img1,
      amapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {
        init: o => {
          console.log(o.getCenter())
          console.log(this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        moveend: () => {},
        zoomchange: () => {},
        click: () => {
          alert('map clicked')
        },
      },
      plugin: [
        'ToolBar',
        {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {
              console.log(o)
            },
          },
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;

  .flex-row-top {
    height: 60%;
    padding: 5px;
  }
  .flex-row-bottom {
    height: 40%;
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

.gutter-map {
  padding: 0;
  border: 1px solid #ddd;
}

.gutter-monitor-box {
  text-align: center;
  span {
    display: inline-block;
  }
}

.gutter-river-box {
  text-align: center;
  span {
    display: inline-block;
  }
}

.gutter-img-box {
  padding: 0;
  line-height: 0;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}

.amap-wrapper {
  width: 100%;
  height: 100%;
}
</style>
