import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/404'
import Forbidden from './views/403'
import findLast from 'lodash/findLast'
import { check, isLogin } from './utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

// 表单路由
// {
//   path: '/form',
//   name: 'form',
//   meta: { icon: 'form', title: '表单页', authority: ['admin'] },
//   component: { render: h => h('router-view') },
//   children: [
//     {
//       path: '/form',
//       redirect: '/form/basic-form',
//     },
//     {
//       path: '/form/basic-form',
//       name: 'basicForm',
//       meta: { title: '基础表单' },
//       component: () =>
//         import(
//           /* webpackChunkName: "form" */ './views/Forms/BasicForm'
//         ),
//     },
//     {
//       path: '/form/step-form',
//       name: 'stepForm',
//       meta: { title: '分步表单' },
//       hideMenuChildren: true,
//       component: () =>
//         import(/* webpackChunkName: "form" */ './views/Forms/StepForm'),
//       children: [
//         {
//           path: '/form/step-form',
//           redirect: '/form/step-form/info',
//         },
//         {
//           path: '/form/step-form/info',
//           name: 'info',
//           component: () =>
//             import(
//               /* webpackChunkName: "form" */ './views/Forms/StepForm/Step1'
//             ),
//         },
//         {
//           path: '/form/step-form/confirm',
//           name: 'confirm',
//           component: () =>
//             import(
//               /* webpackChunkName: "form" */ './views/Forms/StepForm/Step2'
//             ),
//         },
//         {
//           path: '/form/step-form/result',
//           name: 'result',
//           component: () =>
//             import(
//               /* webpackChunkName: "form" */ './views/Forms/StepForm/Step3'
//             ),
//         },
//       ],
//     },
//     {
//       path: '/form/advanced-form',
//       name: 'advancedForm',
//       meta: { title: '高级表单' },
//       component: () =>
//         import(
//           /* webpackChunkName: "form" */ './views/Forms/AdvancedForm'
//         ),
//     },
//   ],
// },

// 仪表盘
// {
//   path: '/dashboard',
//   name: 'dashboard',
//   meta: { icon: 'dashboard', title: '仪表盘' },
//   component: { render: h => h('router-view') },
//   children: [
//     {
//       path: '/dashboard',
//       redirect: '/dashboard/analysis',
//     },
//     {
//       path: '/dashboard/analysis',
//       name: 'analysis',
//       meta: { title: '分析页' },
//       component: () =>
//         import(
//           /* webpackChunkName: "dashboard" */ './views/Dashboard/Analysis'
//         ),
//     },
//     {
//       path: '/dashboard/monitor',
//       name: 'monitor',
//       meta: { title: '监控页' },
//       component: () =>
//         import(
//           /* webpackChunkName: "dashboard" */ './views/Dashboard/Monitor'
//         ),
//     },
//     {
//       path: '/dashboard/workplace',
//       name: 'workplace',
//       meta: { title: '工作台' },
//       component: () =>
//         import(
//           /* webpackChunkName: "dashboard" */ './views/Dashboard/Workplace'
//         ),
//     },
//   ],
// },

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      name: 'user',
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/UserLayout'),
      children: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: '/user/login',
          name: 'login',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/user/Login'),
        },
        {
          path: '/user/register',
          name: 'register',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/user/Register'),
        },
      ],
    },
    {
      path: '/',
      meta: { authority: ['user', 'admin'] },
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/BasicLayout'),
      children: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          name: 'Home',
          meta: { icon: 'home', title: '首页', authority: ['admin'] },
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ './views/dashboard/Monitor'
            ),
        },
        {
          path: '/monitor',
          name: 'Monitor',
          meta: { icon: 'dashboard', title: '监测点', authority: ['admin'] },
          component: () =>
            import(/* webpackChunkName: "table" */ './views/MonitorList'),
        },
        {
          path: '/inspect',
          name: 'Inspect',
          meta: { icon: 'database', title: '巡查管理', authority: ['admin'] },
          component: () =>
            import(/* webpackChunkName: "table" */ './views/inspect/Inspect'),
        },

        {
          path: '/data',
          name: 'Data',
          meta: { icon: 'table', title: '数据服务', authority: ['admin'] },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/data',
              redirect: '/data/collect',
            },
            {
              path: '/data/collect',
              name: 'DataCollect',
              meta: { title: '数据统计' },
              component: () =>
                import(
                  /* webpackChunkName: "table" */ './views/dataService/Collect'
                ),
            },
          ],
        },
      ],
    },
    {
      path: '/403',
      name: '403',
      hideInMenu: true,
      component: Forbidden,
    },
    {
      path: '*',
      name: '404',
      hideInMenu: true,
      component: NotFound,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }

  const record = findLast(to.matched, record => record.meta.authority)

  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({ path: '/user/login' })
    } else if (to.path !== '/403') {
      next({ path: '/403' })
    }

    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
