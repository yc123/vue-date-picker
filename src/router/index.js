import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const route = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "User" */ '../views/user/LeftNav.vue'),
      children: [
        {
          path: 'home',
          meta: {
            title: '首页-买家中心'
          },
          component: () => import(/* webpackChunkName: "User" */ '../views/user/Home.vue')
        },
        {
          path: 'demand',
          meta: {
            title: '我的需求-买家中心'
          },
          component: () => import(/* webpackChunkName: "User" */ '../views/user/Demand.vue')
        },
        {
          path: 'collect',
          meta: {
            title: '我的收藏-买家中心'
          },
          component: () => import(/* webpackChunkName: "User" */ '../views/user/Collect.vue')
        }
      ]
    }
  ]
})

route.beforeEach((to, from, next) => {
  // 登陆守卫
  if (to.meta.title) {
    document.title = to.meta.title
  }
  store.dispatch('options/setRouterLoading', true)
  next()
})

route.afterEach((to, from) => {
  store.dispatch('options/setRouterLoading', false)
  if (!store.state.auth.user.getAuthed) {
    store.dispatch('auth/getAuth')
  }
})

export default route
