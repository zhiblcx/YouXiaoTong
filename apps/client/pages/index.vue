<script setup lang="ts">
import QrScanner from 'qr-scanner'
import LoginImg from '@/assets/images/login.jpg'
import LightningIcon from '@/assets/images/lightning-icon.png'
import ScanIcon from '@/assets/images/scan-icon.png'
import TakeawayIcon from '@/assets/images/takeaway-icon.png'
import WaterIcon from '@/assets/images/water-icon.png'

const finished = ref<boolean>(false)
const loading = ref<boolean>(false)
const router = useRouter()
const page = ref(1)
const pageSize = ref(5)
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

const data = [
  { title: '考试安排1', timer: '2025/02/08 21:13' },
  { title: '新年快乐2', timer: '2025/02/08 21:13' },
  { title: '新年快乐3', timer: '2025/02/08 21:13' },
  { title: '新年快乐4', timer: '2025/02/08 21:13' },
  { title: '新年快乐5', timer: '2025/02/08 21:13' },
  { title: '新年快乐6', timer: '2025/02/08 21:13' },
  { title: '新年快乐7', timer: '2025/02/08 21:13' },
  { title: '新年快乐8', timer: '2025/02/08 21:13' },
  { title: '新年快乐9', timer: '2025/02/08 21:13' },
  { title: '新年快乐10', timer: '2025/02/08 21:13' },
  { title: '新年快乐11', timer: '2025/02/08 21:13' },
  { title: '新年快乐12', timer: '2025/02/08 21:13' },
  { title: '新年快乐13', timer: '2025/02/08 21:13' },
  { title: '新年快乐14', timer: '2025/02/08 21:13' },
  { title: '大学要做的100件小事！看完心里暖暖的QAQ15', timer: '2025/02/08 21:13' }
]

const list = ref<{ title: string; timer: string }[]>(
  data.slice((page.value - 1) * pageSize.value, page.value * pageSize.value) || []
)

function onLoad() {
  setTimeout(() => {
    loading.value = true
    if (list.value.length >= data.length) {
      finished.value = true
    } else {
      page.value++
      const result = data.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
      list.value = [...list.value, ...result]
      loading.value = false
    }
  }, 500)
}

function showPopup() {
  show.value = true
}

function showWaterBillPopup() {
  waterBillShow.value = true
}

function showLightningBillPopup() {
  lightningBillShow.value = true
}

function handleScanner() {
  videoShow.value = true

  nextTick(() => {
    qrScanner = new QrScanner(
      video.value as HTMLVideoElement,
      (res: QrScanner.ScanResult) => {
        message.value = res.data
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
          <div>¥ 0.00</div>
        </div>
      </div>
      <div
        @click="showPopup"
        class="rounded-lg bg-[--van-primary-blue-color] h-[70px] w-[140px] p-3 flex justify-center items-center"
      >
        去充值
      </div>
    </div>
    <ul class="flex justify-around mt-5">
      <li @click="showLightningBillPopup">
        <img
          :src="LightningIcon"
          class="bg-[--van-primary-pink-color] p-2 rounded-[50%]"
        />
        <div class="text-sm text-center mt-1">交电费</div>
      </li>
      <li @click="showWaterBillPopup">
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
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="flex justify-between pt-3"
          v-for="(item, index) in list"
          :key="index"
          @click="router.push(`article/${index}`)"
        >
          <div class="flex flex-col justify-between w-[65%] mt-2">
            <div class="line-clamp-">{{ item.title }}</div>
            <div class="text-[#999]">{{ item.timer }}</div>
          </div>
          <img
            :src="LoginImg"
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
