<template>
  <div style="padding: 20px;">
    <a-row>
      <a-col :span="12">
        <Chart :option="chartOption1" style="height: 450px" />
      </a-col>
      <a-col :span="12">
        <Chart :option="chartOption2" style="height: 450px" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <Chart :option="chartOption3" style="height: 450px" />
      </a-col>
      <a-col :span="12">
        <Chart :option="chartOption4" style="height: 450px" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
import Chart from '../../components/Chart'

const colors = ['#5793f3', '#d14a61', '#675bba']

export default {
  data() {
    return {
      chartOption1: {
        title: {
          text: '阶梯瀑布图',
          subtext: 'From ExcelHome',
          sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var tar
            if (params[1].value != '-') {
              tar = params[1]
            } else {
              tar = params[0]
            }
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
          },
        },
        legend: {
          data: ['支出', '收入'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: (function() {
            var list = []
            for (var i = 1; i <= 11; i++) {
              list.push('11月' + i + '日')
            }
            return list
          })(),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
            },
            data: [
              0,
              900,
              1245,
              1530,
              1376,
              1376,
              1511,
              1689,
              1856,
              1495,
              1292,
            ],
          },
          {
            name: '收入',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
            data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-'],
          },
          {
            name: '支出',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'bottom',
              },
            },
            data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203],
          },
        ],
      },
      chartOption2: {
        title: {
          text: '多 X 轴示例',
        },
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['2015 降水量', '2016 降水量'],
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1],
              },
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    '降水量  ' +
                    params.value +
                    (params.seriesData.length
                      ? '：' + params.seriesData[0].data
                      : '')
                  )
                },
              },
            },
            data: [
              '2016-1',
              '2016-2',
              '2016-3',
              '2016-4',
              '2016-5',
              '2016-6',
              '2016-7',
              '2016-8',
              '2016-9',
              '2016-10',
              '2016-11',
              '2016-12',
            ],
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0],
              },
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    '降水量  ' +
                    params.value +
                    (params.seriesData.length
                      ? '：' + params.seriesData[0].data
                      : '')
                  )
                },
              },
            },
            data: [
              '2015-1',
              '2015-2',
              '2015-3',
              '2015-4',
              '2015-5',
              '2015-6',
              '2015-7',
              '2015-8',
              '2015-9',
              '2015-10',
              '2015-11',
              '2015-12',
            ],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '2015 降水量',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3,
            ],
          },
          {
            name: '2016 降水量',
            type: 'line',
            smooth: true,
            data: [
              3.9,
              5.9,
              11.1,
              18.7,
              48.3,
              69.2,
              231.6,
              46.6,
              55.4,
              18.4,
              10.3,
              0.7,
            ],
          },
        ],
      },
      chartOption3: {
        title: {
          text: '堆叠条形图',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
            data: [150, 212, 201, 154, 190, 330, 410],
          },
          {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
      chartOption4: {
        title: {
          text: '浏览器占比变化',
          subtext: '纯属虚构',
          top: 10,
          left: 10,
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,250,0.2)',
        },
        legend: {
          type: 'scroll',
          bottom: 10,
          data: (function() {
            var list = []
            for (var i = 1; i <= 28; i++) {
              list.push(i + 2000 + '')
            }
            return list
          })(),
        },
        visualMap: {
          top: 'middle',
          right: 10,
          color: ['red', 'yellow'],
          calculable: true,
        },
        radar: {
          indicator: [
            { text: 'IE8-', max: 400 },
            { text: 'IE9+', max: 400 },
            { text: 'Safari', max: 400 },
            { text: 'Firefox', max: 400 },
            { text: 'Chrome', max: 400 },
          ],
        },
        series: (function() {
          var series = []
          for (var i = 1; i <= 28; i++) {
            series.push({
              name: '浏览器（数据纯属虚构）',
              type: 'radar',
              symbol: 'none',
              lineStyle: {
                width: 1,
              },
              emphasis: {
                areaStyle: {
                  color: 'rgba(0,250,0,0.3)',
                },
              },
              data: [
                {
                  value: [
                    (40 - i) * 10,
                    (38 - i) * 4 + 60,
                    i * 5 + 10,
                    i * 9,
                    (i * i) / 2,
                  ],
                  name: i + 2000 + '',
                },
              ],
            })
          }
          return series
        })(),
      },
    }
  },
  mounted() {
    // this.getChartData()
    // this.interval = setInterval(() => {
    //   this.getChartData()
    // }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  components: {
    Chart,
  },
  methods: {
    getChartData() {
      axios({
        url: '/api/dashboard/chart',
        method: 'get',
        params: { ID: 12345 },
      }).then(data => {
        this.chartOption1 = {
          title: {
            text: 'ECharts 入门示例',
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data,
            },
          ],
        }
      })
    },
  },
}
</script>
