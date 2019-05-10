import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/404'
import Forbidden from './views/403'
import findLast from 'lodash/findLast'
import { check, isLogin } from './utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

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
            import(/* webpackChunkName: "user" */ './views/User/Login'),
        },
        {
          path: '/user/register',
          name: 'register',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/User/Register'),
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
          redirect: '/dashboard/analysis',
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { icon: 'dashboard', title: '仪表盘' },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/dashboard',
              redirect: '/dashboard/analysis',
            },
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              meta: { title: '分析页' },
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ './views/Dashboard/Analysis'
                ),
            },
            {
              path: '/dashboard/monitor',
              name: 'monitor',
              meta: { title: '监控页' },
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ './views/Dashboard/Monitor'
                ),
            },
            {
              path: '/dashboard/workplace',
              name: 'workplace',
              meta: { title: '工作台' },
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ './views/Dashboard/Workplace'
                ),
            },
          ],
        },
        {
          path: '/form',
          name: 'form',
          meta: { icon: 'form', title: '表单页', authority: ['admin'] },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/form',
              redirect: '/form/basic-form',
            },
            {
              path: '/form/basic-form',
              name: 'basicForm',
              meta: { title: '基础表单' },
              component: () =>
                import(
                  /* webpackChunkName: "form" */ './views/Forms/BasicForm'
                ),
            },
            {
              path: '/form/step-form',
              name: 'stepForm',
              meta: { title: '分步表单' },
              hideMenuChildren: true,
              component: () =>
                import(/* webpackChunkName: "form" */ './views/Forms/StepForm'),
              children: [
                {
                  path: '/form/step-form',
                  redirect: '/form/step-form/info',
                },
                {
                  path: '/form/step-form/info',
                  name: 'info',
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ './views/Forms/StepForm/Step1'
                    ),
                },
                {
                  path: '/form/step-form/confirm',
                  name: 'confirm',
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ './views/Forms/StepForm/Step2'
                    ),
                },
                {
                  path: '/form/step-form/result',
                  name: 'result',
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ './views/Forms/StepForm/Step3'
                    ),
                },
              ],
            },
            {
              path: '/form/advanced-form',
              name: 'advancedForm',
              meta: { title: '高级表单' },
              component: () =>
                import(
                  /* webpackChunkName: "form" */ './views/Forms/AdvancedForm'
                ),
            },
          ],
        },
        {
          path: '/table',
          name: 'table',
          meta: { icon: 'table', title: '列表', authority: ['admin'] },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/table',
              redirect: '/table/basic-table',
            },
            {
              path: '/table/basic-table',
              name: 'basicTable',
              meta: { title: '基础列表' },
              component: () =>
                import(
                  /* webpackChunkName: "table" */ './views/Table/BasicTable'
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
