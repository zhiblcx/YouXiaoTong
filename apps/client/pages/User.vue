<script setup lang="ts">
import CampusCardImg from '@/assets/images/campus-card.jpg'
import { ShowPersonApi } from '@/composables/auth'

const person = ref({
  money: 0.0,
  name: ''
})

const { data, status } = await ShowPersonApi()

watch(
  status,
  () => {
    if (status.value === 'success') {
      if (!data.value?.response) {
        person.value = {
          money: data.value.money,
          name: data.value.name
        }
      }
    }
  },
  { immediate: true }
)

const router = useRouter()
const active = ref<number>(1)

watch(active, () => {
  switch (active.value) {
    case 0:
      router.push('/')
      break
    case 1:
      router.push('/User')
  }
})

function handleExit() {
  showConfirmDialog({
    title: '退出登录',
    message: '你确定要退出登录吗？'
  }).then(() => {
    localStorage.removeItem('token')
    router.push('/')
    showSuccessToast('确定退出')
  })
}
</script>

<template>
  <div class="bg-[#f2f2f2] min-h-screen">
    <div class="relative h-[250px]">
      <div class="absolute p-3">
        <img
          :src="CampusCardImg"
          class="rounded-xl"
        />
      </div>
      <div v-if="status === 'success'">
        <div class="absolute left-[50px] top-[110px] text-3xl font-bold">¥ {{ person.money.toFixed(2) }}</div>
        <div class="absolute left-[50px] top-[150px] text-xl font-bold">姓名：{{ person.name }}</div>
      </div>
    </div>
    <van-cell-group>
      <van-cell
        title="交易明细"
        is-link
        @click="router.push('/setting/transactiondetails')"
      />
      <van-cell
        title="订单详情"
        is-link
        @click="router.push('/setting/orderdetails')"
      />
      <van-cell
        title="个人信息"
        is-link
        @click="router.push('/setting/personinfo')"
      />
      <van-cell
        title="我的地址"
        is-link
        @click="router.push('/setting/addresslist')"
      />
      <van-cell
        title="修改密码"
        is-link
        @click="router.push('/setting/changepassword')"
      />
      <van-cell
        title="退出登录"
        is-link
        @click="handleExit"
      />
    </van-cell-group>
  </div>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="contact-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
