<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from './SubMenu'
export default {
  components: {
    'sub-menu': SubMenu,
  },
  props: {
    theme: {
      type: String,
      default: () => 'dark',
    },
  },
  data() {
    // openKeys 和 selectedKeys 底层的实现是一个数组，
    // 在初始化路由菜单的时候保存每个菜项对应的 openKeys 和 selectKeys
    // 在之后路由变化的时候就可以很方便的调整菜单的变化
    this.openKeysMap = {}
    this.selectedKeysMap = {}
    const menuData = this.getMenuData(this.$router.options.routes)

    return {
      collapsed: false,
      menuData,
      // 根据初始的路由来设计 打开和选择的菜单
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
      selectedKeys: this.selectedKeysMap[this.$route.path],
    }
  },
  watch: {
    '$route.path': function(val) {
      // 每当路由变化的时候，同步的更新 openKeys 和 selectedKeys
      // 这样就会触发到菜单的不同更新
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
      this.selectedKeys = this.selectedKeysMap[val]
    },
    '$parent.collapsed': function(val) {
      val && (this.openKeys = [])
    },
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = []
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [selectedKey || item.path]

          const newItem = { ...item }
          delete newItem.children
          if (item.children && !item.hideMenuChildren) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ])
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            )
          }
          menuData.push(newItem)
        } else if (
          !item.hideInMenu &&
          !item.hideMenuChildren &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          )
        }
      })

      return menuData
    },
  },
}
</script>
