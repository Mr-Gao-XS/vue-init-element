const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login'),
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout'),
    meta: {
      hideInMenu: true,
      notCache: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          icon: 'el-icon-s-home'
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
      },
      {
        path: '/categories',
        name: 'categories',
        meta: {
          hideInMenu: true,
          title: '分类管理',
          icon: 'el-icon-s-data'
        },
        component: () => import(/* webpackChunkName: "categories" */ '@/views/categories'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "notfound" */ '@/views/notfound'),
    meta: {
      title: '404',
      hideInMenu: true,
    },
  },
  {
    path: '*',
    redirect: '/404',
  },
]
export default routes
