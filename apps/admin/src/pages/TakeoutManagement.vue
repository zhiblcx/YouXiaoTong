<script setup>
import { onMounted, ref, watch } from 'vue'
import { message, notification } from 'ant-design-vue'
import { showPersonApi } from '@/api'

const text = ref(null)
const show = ref(false)
const qrcode = ref({
  businessId: '',
  money: 0
})

onMounted(async () => {
  const { data: person } = await showPersonApi()
  if (person.statusCode === undefined) {
    qrcode.value.businessId = person.id
  }
})

watch(text, () => (show.value = false))

const handleShow = () => {
  if (text.value) {
    qrcode.value.money = text.value
    show.value = true
    console.log(qrcode.value)
    // openNotificationWithIcon(text.value)
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
