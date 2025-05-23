import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import Layout from '@/pages/Layout.vue'
import Login from '@/pages/Login.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Layout,
    meta: { breadcrumb: '首页' },
    children: [
      {
        path: '',
        component: () => import('@/pages/Home.vue')
      }
    ]
  },
  {
    path: '/businesses',
    component: Layout,
    meta: { breadcrumb: '商家管理' },
    children: [
      {
        path: '',
        component: () => import('@/pages/BusinessesManagement.vue')
      }
    ]
  },
  {
    path: '/transporter',
    component: Layout,
    meta: { breadcrumb: '运输员管理' },
    children: [
      {
        path: '',
        component: () => import('@/pages/TransporterManagement.vue')
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    meta: { breadcrumb: '学生管理' },
    children: [
      {
        path: '',
        component: () => import('@/pages/StudentManagement.vue')
      }
    ]
  },
  {
    path: '/species',
    component: Layout,
    meta: { breadcrumb: '商品种类管理' },
    children: [
      {
        path: '',
        component: () => import('@/pages/SpeciesManagement.vue')
      }
    ]
  },
  {
    path: '/stock',
    component: Layout,
    meta: { breadcrumb: '库存管理' },
    children: [
      {
        path: '',
        component: () => import('@/pages/StockManagement.vue')
      }
    ]
  },
  {
    path: '/stock2',
    component: Layout,
    meta: { breadcrumb: '库存管理' },
    children: [
      {
        path: '',
        component: () => import('@/pages/Stock.vue')
      }
    ]
  },
  {
    path: '/inventory',
    component: Layout,
    meta: { breadcrumb: '出入库申请' },
    children: [
      {
        path: '',
        component: () => import('@/pages/InventoryRequest.vue')
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    meta: { breadcrumb: '校园头条' },
    children: [
      {
        path: 'addarticle',
        component: () => import('@/pages/article/ArticleAdd.vue'),
        meta: { breadcrumb: '添加文章' }
      },
      {
        path: 'editarticle',
        component: () => import('@/pages/article/ArticleEdit.vue'),
        meta: { breadcrumb: '文章编辑' }
      }
    ]
  },
  {
    path: '/editpassword',
    component: Layout,
    meta: { breadcrumb: '修改密码' },
    children: [
      {
        path: '',
        component: () => import('@/pages/EditPassword.vue')
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    meta: { breadcrumb: '订单管理' },
    children: [
      {
        path: '',
        component: () => import('@/pages/OrderManagement.vue')
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    meta: { breadcrumb: '菜单管理' },
    children: [
      {
        path: 'addproduct',
        component: () => import('@/pages/product/AddProduct.vue'),
        meta: { breadcrumb: '添加菜品' }
      },
      {
        path: 'editproduct',
        component: () => import('@/pages/product/EditProduct.vue'),
        meta: { breadcrumb: '编辑菜单' }
      }
    ]
  },
  {
    path: '/takeout',
    component: Layout,
    meta: { breadcrumb: '堂食管理' },
    children: [
      {
        path: '',
        component: () => import('@/pages/TakeoutManagement.vue')
      }
    ]
  },
  {
    path: '/charge',
    component: Layout,
    meta: { breadcrumb: '收费记录' },
    children: [
      {
        path: '',
        component: () => import('@/pages/ChargeManagement.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = localStorage.getItem('token')
  if (to.path != '/login' && !token) {
    next({ path: '/login' })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
