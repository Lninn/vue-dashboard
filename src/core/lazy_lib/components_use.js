import Vue from 'vue'

import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Dropdown,
  Tabs,
  Form,
  Input,
  Checkbox,
  Select,
  Table,
  Row,
  Col,
  Divider,
  Card,
  Alert,
  Modal,
  Badge,
  Spin,
  InputNumber,
  DatePicker,
  Steps,
  message,
  notification,
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(Divider)
Vue.use(Card)
Vue.use(Alert)
Vue.use(Modal)
Vue.use(Spin)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Steps)
Vue.use(Badge)
Vue.use(message)
Vue.use(notification)

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1154049_w87h4oeytph.js', // 在 iconfont.cn 上生成
})

Vue.component('IconFont', IconFont)

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm
