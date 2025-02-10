<script setup>
import { ref, watch } from 'vue'
import { message, notification } from 'ant-design-vue'

const text = ref(null)
const show = ref(false)

watch(text, () => (show.value = false))

const handleShow = () => {
  if (text.value) {
    show.value = true
    // openNotificationWithIcon()
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
      :value="text"
      :style="{ visibility: show ? 'visible' : 'hidden' }"
    />

    <a-input
      v-model:value="text"
      placeholder="请输入要交易的金额"
      :maxlength="60"
    />
    <a-button
      type="primary"
      @click="handleShow"
      >生成二维码</a-button
    >
  </a-space>
</template>
