<script setup>
import { onMounted, ref, watch } from 'vue'
import { message, notification } from 'ant-design-vue'
import { showPersonApi, showTransactionApi } from '@/api'
import dayjs from 'dayjs'

const text = ref(null)
const show = ref(false)
const qrcode = ref()
const qr = ref({
  id: 0,
  businessId: '',
  money: 0
})
let timer = null

onMounted(async () => {
  const { data: person } = await showPersonApi()
  if (person.statusCode === undefined) {
    qr.value.businessId = person.id
  }
})

watch(text, () => {
  show.value = false
  clearInterval(timer)
  timer = null
})

const handleShow = () => {
  if (text.value) {
    qr.value.id = dayjs().valueOf()
    qr.value.money = text.value
    qrcode.value = JSON.stringify(qr.value)
    show.value = true
    timer = setInterval(async () => {
      const { data: result } = await showTransactionApi(qr.value.id)
      if (result.id === undefined) {
        console.log('未付款')
      } else {
        openNotificationWithIcon(qr.value.money)
        text.value = 0
      }
    }, 3000)
  } else {
    message.error('请填写交易金额')
  }
}

const openNotificationWithIcon = (money) => {
  notification['success']({
    message: '交易成功',
    description: `顾客已支付 ${money} 元`
  })
}
</script>

<template>
  <a-space
    class="w-full h-full mt-32"
    direction="vertical"
    align="center"
  >
    <a-qrcode
      :value="qrcode"
      :style="{ visibility: show ? 'visible' : 'hidden' }"
    />
    <a-input-number
      v-model:value="text"
      placeholder="请输入要交易的金额"
      style="width: 200px"
      addon-after="$"
      precision="2"
    />
    <a-button
      type="primary"
      @click="handleShow"
      >生成二维码</a-button
    >
  </a-space>
</template>
