import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/404'

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
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/dashboard',
              redirect: '/dashboard/analysis',
            },
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ './views/Dashboard/Analysis'
                ),
            },
            {
              path: '/dashboard/monitor',
              name: 'monitor',
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ './views/Dashboard/Monitor'
                ),
            },
            {
              path: '/dashboard/workplace',
              name: 'workplace',
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
          component: () =>
            import(/* webpackChunkName: "layout" */ './layouts/BasicLayout'),
          children: [
            {
              path: '/form',
              redirect: '/form/basic-form',
            },
            {
              path: '/form/basic-form',
              name: 'basicForm',
              component: () =>
                import(
                  /* webpackChunkName: "form" */ './views/Forms/BasicForm'
                ),
            },
            {
              path: '/form/step-form',
              name: 'stepForm',
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
              component: () =>
                import(
                  /* webpackChunkName: "form" */ './views/Forms/AdvancedForm'
                ),
            },
          ],
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
})

router.beforeEach((to, form, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
