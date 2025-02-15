<script setup lang="ts">
import { rechargeWaterApi } from '@/composables/auth'
import { useMoneyStore } from '~/shared/store/person'
const moneyStore = useMoneyStore()
const show = defineModel<boolean>()
const money = ref<number>(1)
async function recharge() {
  const { data } = await rechargeWaterApi(money.value)
  if (!data.value.response) {
    moneyStore.setMoney(moneyStore.money - Number(money.value))
    showSuccessToast('充值成功')
    show.value = false
    money.value = 1
  } else {
    showFailToast(data.value.message)
    show.value = false
  }
}
</script>

<template>
  <van-popup
    class="p-8 rounded-lg"
    v-model:show="show"
  >
    <div class="font-bold text-center mb-2">交水费</div>
    <van-field
      v-model="money"
      type="number"
      label="充值的金额"
      class="mb-5"
    />
    <van-button
      round
      block
      type="primary"
      @click="recharge"
    >
      充值
    </van-button>
  </van-popup>
</template>
