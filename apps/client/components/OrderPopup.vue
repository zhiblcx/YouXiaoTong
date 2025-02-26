<script setup lang="ts">
import { ShowPersonApi } from '~/composables/auth'
import { addOrderApi } from '~/composables/business'
import { useMoneyStore } from '~/shared/store/person'
import { useShoppingCarStore } from '~/shared/store/shoppingCar'

const router = useRouter()
const show = defineModel<boolean>()
const note = ref<string>('')
const shoppingStore = useShoppingCarStore()
const moneyStore = useMoneyStore()
const { data: person } = await ShowPersonApi()

async function submit() {
  if (moneyStore.money < shoppingStore.total / 100) {
    console.log('余额不够')
    showFailToast('余额不够')
  } else {
    try {
      if (person.value.Address.length === 0) {
        return showFailToast('请选择收货地址')
      }
      shoppingStore.shopping.forEach(async (item) => {
        const data = item.map((item2) => ({
          menuId: item2.id,
          quantity: item2.quantity
        }))
        const { data: result } = await addOrderApi({
          note: note.value,
          businessId: item[0].businessId,
          addressId: person.value.Address[0].id,
          order: data
        })
        if (result.value.response === undefined) {
          throw new Error()
        }
      })
      moneyStore.setMoney(moneyStore.money - shoppingStore.total / 100)
      show.value = false
      showSuccessToast('提交成功')
      router.replace('/setting/orderdetails')
    } catch (err) {
      showFailToast('提交失败')
    }
  }
}
</script>

<template>
  <van-popup
    class="p-8 rounded-lg"
    v-model:show="show"
  >
    <div class="font-bold text-center mb-2">提交订单</div>
    <van-field
      v-model="note"
      type="textarea"
      style="height: 100px"
      label="备注"
      class="mb-5"
    />
    <van-button
      round
      block
      type="primary"
      @click="submit"
    >
      提交
    </van-button>
  </van-popup>
</template>
