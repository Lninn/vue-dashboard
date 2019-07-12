<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="设备列表">
              <a-select
                v-model="queryParam.deviceId"
                placeholder="请选择"
                default-value="0"
              >
                <a-select-option value="0" key="0">
                  所有设备
                </a-select-option>
                <template v-for="item in devSelectList">
                  <a-select-option :value="item.value" :key="item.value">
                    {{ item.label }}
                  </a-select-option>
                </template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="时间范围">
              <a-range-picker
                style="width: 100%"
                :ranges="{
                  Today: [moment(), moment()],
                  'This Month': [moment(), moment().endOf('month')],
                }"
                showTime
                format="YYYY/MM/DD HH:mm:ss"
                @change="onChange"
              />
            </a-form-item>
          </a-col>
          <!-- <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number
                  v-model="queryParam.callNo"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker
                  v-model="queryParam.date"
                  style="width: 100%"
                  placeholder="请输入更新日期"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select
                  v-model="queryParam.useStatus"
                  placeholder="请选择"
                  default-value="0"
                >
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template> -->
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="
                (advanced && { float: 'right', overflow: 'hidden' }) || {}
              "
            >
              <a-button type="primary" @click="$refs.table.refresh(true)"
                >查询</a-button
              >
              <a-button
                style="margin-left: 8px"
                @click="() => (queryParam = {})"
                >重置</a-button
              >
              <!-- <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <!-- <a-button type="primary" icon="plus" @click="$refs.createModal.add()"
        >新建</a-button
      > -->
      <!-- <a-button type="dashed" @click="tableOption"
        >{{ (optionAlertShow && '关闭') || '开启' }} alert</a-button
      > -->
      <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- :alert="options.alert" -->
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="false"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <!-- <span slot="status" slot-scope="text">
        <a-badge
          :status="text | statusTypeFilter"
          :text="text | statusFilter"
        />
      </span>
      <span slot="description" slot-scope="text">
        <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">配置</a>
          <a-divider type="vertical" />
          <a @click="handleSub(record)">订阅分析</a>
        </template>
      </span> -->
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
    <step-by-step-modal ref="modal" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import STable from '@/components/Table'
// import Ellipsis from '@/components/Ellipsis'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import { mapActions } from 'vuex'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭',
  },
  1: {
    status: 'processing',
    text: '运行中',
  },
  2: {
    status: 'success',
    text: '已上线',
  },
  3: {
    status: 'error',
    text: '异常',
  },
}

const columns = [
  {
    title: '规则编号',
    dataIndex: 'no',
  },
  {
    title: '设备 ID',
    dataIndex: 'deviceId',
  },
  {
    title: '温度',
    dataIndex: 'temp',
    customRender: text => text + ' °C',
  },
  {
    title: '酸碱度',
    dataIndex: 'ph',
    customRender: text => text + ' PH 值',
  },
  {
    title: '溶解度',
    dataIndex: 'rdo',
    customRender: text => text + ' mg/L',
  },
  {
    title: '氨氮',
    dataIndex: 'nhn',
    customRender: text => text + ' mg/L',
  },
  {
    title: '化学需氧量',
    dataIndex: 'cod',
    customRender: text => text + ' mg/L',
  },
  {
    title: '浊度',
    dataIndex: 'zs',
    customRender: text => text + ' NTU',
  },
  {
    title: '剩余电量',
    dataIndex: 'dumpEnergy',
  },
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   width: '150px',
  //   scopedSlots: { customRender: 'action' },
  // },
]

export default {
  name: 'DataCollectList',
  components: {
    STable,
    // Ellipsis,
    CreateForm,
    StepByStepModal,
  },
  data() {
    return {
      mdl: {},
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      // 高级搜索 展开/关闭
      advanced: false,
      devSelectList: [],
      // 查询参数
      queryParam: {
        deviceId: '0',
        start: '',
        end: '',
      },
      // 表头
      columns,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return this.GetDataCollectList(
          Object.assign(parameter, this.queryParam)
        ).then(res => {
          return res
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      // custom table alert & rowSelection
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          },
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange,
        },
      },
      optionAlertShow: false,
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    },
  },
  created() {
    this.tableOption()
    this.GetDevSelectList().then(data => {
      this.devSelectList = [...data]
    })
  },
  methods: {
    ...mapActions('app', ['GetDevSelectList', 'GetDataCollectList']),

    moment,
    onChange(dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    },

    tableOption() {
      if (!this.optionAlertShow) {
        this.options = {
          alert: {
            show: true,
            clear: () => {
              this.selectedRowKeys = []
            },
          },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: String(record.no),
              },
            }),
          },
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null,
        }
        this.optionAlertShow = false
      }
    },
    handleEdit(record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    handleSub(record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date()),
      }
    },
  },
}
</script>

<style lang="less">
.table-alert {
  margin-bottom: 16px;
}

.table-page-search-wrapper {
  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 24px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
}

.table-operator {
  margin-bottom: 18px;

  button {
    margin-right: 8px;
  }
}
</style>
