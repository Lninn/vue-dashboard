<template>
  <s-table
    ref="table"
    size="default"
    :columns="columns"
    :data="loadData"
    rowKey="id"
  >
    <span slot="action">
      <a>编辑</a>
      <a-divider type="vertical" />
      <a-dropdown>
        <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>
  </s-table>
</template>

<script>
import STable from '@/components/Table/'
import { axios } from '@/utils/request'

export default {
  components: {
    STable,
  },
  data() {
    return {
      columns: [
        {
          title: '规则编号',
          dataIndex: 'no',
        },
        {
          title: '描述',
          dataIndex: 'description',
        },
        {
          title: '服务调用次数',
          dataIndex: 'callNo',
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
        },
        {
          table: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      // 查询条件参数
      queryParam: {},
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
  methods: {
    edit() {
      // axios 发送数据到后端 修改数据成功后
      // 调用 refresh() 重新加载列表数据
      // 这里 setTimeout 模拟发起请求的网络延迟..
      setTimeout(() => {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
      }, 1500)
    },
  },
}
</script>
