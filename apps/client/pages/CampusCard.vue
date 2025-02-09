<script setup lang="ts">
import CampusCardImg from '@/assets/images/campus-card.jpg'

const router = useRouter()

function handleTransaction() {
  router.push('/setting/transactiondetails')
}

function handleRecharge() {
  router.push('/setting/rechargedetails')
}

function handlePerson() {
  router.push('/setting/personinfo')
}

function handleAddress() {
  router.push('/setting/addressedit')
}

function handlePassword() {
  router.push('/setting/changepassword')
}

function handleExit() {
  showConfirmDialog({
    title: '退出登录',
    message: '你确定要退出登录吗？'
  }).then(() => {
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
      <div class="absolute left-[50px] top-[110px] text-3xl font-bold">¥ 0.00</div>
      <div class="absolute left-[50px] top-[150px] text-xl font-bold">姓名：张三丰</div>
    </div>
    <van-cell-group>
      <van-cell
        title="交易明细"
        is-link
        @click="handleTransaction"
      />
      <van-cell
        title="充值详情"
        is-link
        @click="handleRecharge"
      />
      <van-cell
        title="个人信息"
        is-link
        @click="handlePerson"
      />
      <van-cell
        title="地址编辑"
        is-link
        @click="handleAddress"
      />
      <van-cell
        title="修改密码"
        is-link
        @click="handlePassword"
      />
      <van-cell
        title="退出登录"
        is-link
        @click="handleExit"
      />
    </van-cell-group>
  </div>
</template>
