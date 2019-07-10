<template>
  <a-card :bordered="false">
    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="false"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
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
          <a @click="handleSub(record)">订阅报警</a>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import STable from '@/components/Table'
import Ellipsis from '@/components/Ellipsis'
import { axios } from '@/utils/request'

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
    title: '#',
    scopedSlots: { customRender: 'serial' },
  },
  {
    title: '站点名称',
    dataIndex: 'deviceName',
  },
  {
    title: '站点位置',
    dataIndex: 'location',
    scopedSlots: { customRender: 'location' },
  },
  {
    title: '所属河道',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true,
    customRender: text => text + ' 次',
  },
  {
    title: '所属街道',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
]

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
  },
  data() {
    return {
      mdl: {},
      // 查询参数
      queryParam: {},
      // 表头
      columns,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return axios({
          url: '/table/basic',
          method: 'get',
          params: Object.assign(parameter, this.queryParam),
        }).then(res => {
          return res
        })
      },
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
  methods: {
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
