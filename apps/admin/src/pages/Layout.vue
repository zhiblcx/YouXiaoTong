<script setup>
import { ref, watchEffect } from 'vue'
import {
  FileOutlined,
  UserOutlined,
  MoneyCollectOutlined,
  ProjectOutlined,
  QrcodeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SyncOutlined,
  ExpandOutlined,
  BarChartOutlined,
  TransactionOutlined
} from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { useNicknameStore } from '@/stores/nickname'
import screenfull from 'screenfull'

const store = useNicknameStore()
const collapsed = ref(false)
const router = useRouter()
const subMenu = [{ article: '校园头条', product: '菜单管理' }]
const breadcrumbItem = ref([])
const route = useRoute()
const selectedKeys = ref([])
const stateSpin = ref(false)

watchEffect(() => {
  selectedKeys.value = []
  const matchedRoutes = route.matched
  const key = route.fullPath.slice(1, route.fullPath.length).split('/')
  selectedKeys.value = key
  const breadcrumb = matchedRoutes.reduce((acc, route) => {
    if (route.meta && route.meta.breadcrumb) {
      acc.push(route.meta.breadcrumb)
    }
    return acc
  }, [])
  breadcrumbItem.value = breadcrumb
})

function handleMenuClick({ key, keyPath, domEvent }) {
  selectedKeys.value = []
  breadcrumbItem.value = []
  const subMenuKey = keyPath.find((k) => k !== key)
  if (subMenuKey != undefined) {
    const value = subMenu.find((menu) => menu[subMenuKey] != undefined)
    if (value[subMenuKey] != undefined) {
      breadcrumbItem.value.push(value[subMenuKey])
    }
  }
  breadcrumbItem.value.push(domEvent.target.innerText)
  let path = ''
  for (let i = 0; i < keyPath.length; i++) {
    path = path + '/' + keyPath[i]
    selectedKeys.value.push(keyPath[i])
  }
  router.push(path)
}

function refresh() {
  stateSpin.value = true
  router.go(0)
  setTimeout(() => {
    stateSpin.value = false
  }, 1000)
}

function exitLogin() {
  router.push('/login')
  localStorage.removeItem('token')
}

function fullScreen() {
  screenfull.toggle()
}
</script>

<template>
  <a-layout>
    <a-affix>
      <a-layout-sider
        theme="light"
        v-model:collapsed="collapsed"
        :style="{ height: '100vh' }"
        :trigger="null"
        collapsible
      >
        <div class="logo" />
        <a-menu
          theme="light"
          v-model:selectedKeys="selectedKeys"
          @click="handleMenuClick"
          mode="inline"
        >
          <a-menu-item key="home">
            <BarChartOutlined />
            <span>首页</span>
          </a-menu-item>

          <a-sub-menu key="product">
            <template #title>
              <ProjectOutlined />
              <span>菜单管理</span>
            </template>
            <a-menu-item key="editproduct">编辑菜单</a-menu-item>
            <a-menu-item key="addproduct">添加菜品</a-menu-item>
          </a-sub-menu>

          <a-menu-item key="takeout">
            <QrcodeOutlined />
            <span>堂食管理</span>
          </a-menu-item>

          <a-menu-item key="order">
            <MoneyCollectOutlined />
            <span>订单管理</span>
          </a-menu-item>

          <a-menu-item key="charge">
            <TransactionOutlined />
            <span>收费记录</span>
          </a-menu-item>
        </a-menu>

        <!-- <a-menu
          theme="light"
          v-model:selectedKeys="selectedKeys"
          @click="handleMenuClick"
          mode="inline"
        >
          <a-menu-item key="home">
            <BarChartOutlined />
            <span>首页</span>
          </a-menu-item>

          <a-menu-item key="student">
            <user-outlined />
            <span>学生管理</span>
          </a-menu-item>

          <a-menu-item key="businesses">
            <user-outlined />
            <span>商家管理</span>
          </a-menu-item>

          <a-sub-menu key="article">
            <template #title>
              <file-outlined />
              <span>校园头条</span>
            </template>
            <a-menu-item key="editarticle">文章编辑</a-menu-item>
            <a-menu-item key="addarticle">添加文章</a-menu-item>
          </a-sub-menu>
        </a-menu> -->
      </a-layout-sider>
    </a-affix>
    <a-layout>
      <a-layout-header style="background-color: #fff; padding-left: 20px">
        <div style="display: flex; justify-content: space-between">
          <div>
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
          </div>
          <div>
            <ExpandOutlined
              style="margin-right: 15px; cursor: pointer"
              @click="fullScreen"
            />
            <sync-outlined
              style="margin-right: 15px; color: #696b6f; cursor: pointer"
              @click="refresh"
              :spin="stateSpin"
            />
            <a-dropdown>
              <span
                style="color: #696b6f; font-size: 12px; cursor: pointer"
                @click.prevent
              >
                {{ store.nickname }}
                <DownOutlined />
              </span>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <div
                      style="color: #696b6f; font-size: 12px"
                      @click="exitLogin"
                    >
                      退出登录
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-breadcrumb style="margin-top: 10px; padding-left: 20px">
        <a-breadcrumb-item
          v-for="(item, index) in breadcrumbItem"
          :key="index"
          >{{ item }}</a-breadcrumb-item
        >
      </a-breadcrumb>
      <a-layout-content
        :style="{
          margin: '16px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
