<script setup lang="ts">
import QrScanner from 'qr-scanner'
import LightningIcon from '@/assets/images/lightning-icon.png'
import ScanIcon from '@/assets/images/scan-icon.png'
import TakeawayIcon from '@/assets/images/takeaway-icon.png'
import WaterIcon from '@/assets/images/water-icon.png'
import dayjs from 'dayjs'
import { getArticle } from '~/composables/article'
import { ShowPersonApi } from '~/composables/auth'
import { useMoneyStore } from '~/shared/store/person'
import { qrTransactionAPI } from '~/composables/business'

const moneyStore = useMoneyStore()
const { data } = await getArticle()
const { data: person } = await ShowPersonApi()

watch(person, () => {
  moneyStore.setMoney(person?.value?.money as number)
})

const router = useRouter()
const show = ref<boolean>(false)
const waterBillShow = ref<boolean>(false)
const lightningBillShow = ref<boolean>(false)
const active = ref<number>(0)
const video = ref<HTMLVideoElement | null>(null)
const videoShow = ref<boolean>(false)
let qrScanner: QrScanner | null = null
const message = ref('')

watch(active, () => {
  switch (active.value) {
    case 0:
      router.push('/')
      break
    case 1:
      router.push('/User')
  }
})

function handleScanner() {
  videoShow.value = true

  nextTick(() => {
    qrScanner = new QrScanner(
      video.value as HTMLVideoElement,
      async (res: QrScanner.ScanResult) => {
        message.value = res.data
        videoShow.value = false
        // 停止扫描器
        qrScanner?.stop()

        const qrCode = JSON.parse(message.value)

        if (qrCode.money > moneyStore.money) {
          showFailToast('余额不足')
        }

        const { data: result } = await qrTransactionAPI(qrCode)
        if (result.value.response === undefined) {
          showSuccessToast('支付成功')
          moneyStore.setMoney(moneyStore.money - qrCode.money)
        } else {
          showFailToast('支付失败')
        }
      },
      {
        onDecodeError(error) {},
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true
      }
    )
    qrScanner.start()
  })
}

function handleOrderFood() {
  router.push('/takeaway')
}
</script>

<template>
  <van-popup
    v-model:show="videoShow"
    @closed="(qrScanner as QrScanner).stop()"
  >
    <video ref="video" />
  </van-popup>

  <RechargePopup v-model="show" />
  <RechargeWaterPopup v-model="waterBillShow" />
  <RechargeLightningPopup v-model="lightningBillShow" />

  <div class="bg-[#f2f2f2] min-h-screen">
    <div class="flex justify-around items-center text-white pt-8">
      <div class="flex items-center rounded-lg h-[70px] w-[140px] p-3 bg-[--van-primary-pink-color]">
        <div>
          <div>校园卡余额：</div>
          <div>¥ {{ (moneyStore?.money).toFixed(2) }}</div>
        </div>
      </div>
      <div
        @click="show = true"
        class="rounded-lg bg-[--van-primary-blue-color] h-[70px] w-[140px] p-3 flex justify-center items-center"
      >
        去充值
      </div>
    </div>
    <ul class="flex justify-around mt-5">
      <li @click="lightningBillShow = true">
        <img
          :src="LightningIcon"
          class="bg-[--van-primary-pink-color] p-2 rounded-[50%]"
        />
        <div class="text-sm text-center mt-1">交电费</div>
      </li>
      <li @click="waterBillShow = true">
        <img
          :src="WaterIcon"
          class="bg-[--van-primary-pink-color] p-2 rounded-[50%]"
        />
        <div class="text-sm text-center mt-1">交水费</div>
      </li>
      <li @click="handleOrderFood">
        <img
          :src="TakeawayIcon"
          class="bg-[--van-primary-pink-color] p-2 rounded-[50%]"
        />
        <div class="text-sm text-center mt-1">点餐</div>
      </li>
      <li @click="handleScanner">
        <img
          :src="ScanIcon"
          class="bg-[--van-primary-pink-color] p-2 rounded-[50%]"
        />
        <div class="text-sm text-center mt-1">扫一扫</div>
      </li>
    </ul>
    <div class="shadow-lg mt-7 m-2 rounded-lg bg-white p-2 pl-5">
      <div class="text-xl font-bold mt-4">校园头条</div>
      <van-list>
        <div
          class="flex justify-between pt-3"
          v-for="(item, index) in data"
          :key="index"
          @click="router.push(`article/${item.id}`)"
        >
          <div class="flex flex-col justify-between w-[65%] mt-2">
            <div class="line-clamp-">{{ item.title }}</div>
            <div class="text-[#999]">{{ dayjs(item.timer).format('YYYY-MM-DD HH:mm') }}</div>
          </div>
          <img
            :src="item.photo"
            class="w-[100px] h-[100px] object-cover rounded-2xl"
          />
        </div>
      </van-list>
    </div>
  </div>

  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="contact-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
