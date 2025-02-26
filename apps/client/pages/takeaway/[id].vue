<script setup lang="ts">
import { getMenuById } from '@/composables/business'
import { useShoppingCarStore } from '~/shared/store/shoppingCar'

const route = useRoute()
const router = useRouter()
const { data } = await getMenuById(Number(route.params.id))
const shoppingCarStore = useShoppingCarStore()

const handleShopping = () => {
  // 先找商家，是否有同样的商家，如果有，处于同一个数组
  // 如果没有，新开一个数组
  // 如果同样的商家有，那么同样的商品是否有，如果有 quantity 加一个，如果没有，直接添加
  shoppingCarStore.addShopping(data.value)
  showSuccessToast('加入购物车成功')
  router.back()
}
</script>
<template>
  <div class="min-h-screen relative">
    <img
      :src="data?.photo"
      class="h-[200px] w-screen object-cover"
    />
    <div class="p-2 text-lg font-bold">商品名称：{{ data?.title }}</div>
    <div class="p-2">
      <div>商品详情：</div>
      <div v-html="data?.description"></div>
    </div>
    <van-action-bar>
      <van-action-bar-button
        color="#fb86a7"
        type="warning"
        text="加入购物车"
        @click="handleShopping"
      />
    </van-action-bar>
  </div>
</template>
