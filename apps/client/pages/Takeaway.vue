<script setup lang="ts">
import PlusIcon from '@/assets/images/plus-icon.png'
import MinusIcon from '@/assets/images/minus-icon.png'
import ShoppingCarIcon from '@/assets/images/shopping-card-icon.png'
import { getBusinessApi, getMenuPublicByBusinessApi } from '@/composables/business'
import { useShoppingCarStore } from '~/shared/store/shoppingCar'
import { ShowPersonApi } from '~/composables/auth'

const shoppingStore = useShoppingCarStore()
const router = useRouter()
const activeIndex = ref<number>(0)
const show = ref<boolean>(false)
const searchValue = ref()
const checked = ref()
const status = ref(0)
const items = ref([])
const goods = ref([])
const shopping = ref(shoppingStore.shopping.flat())
const { data: person } = await ShowPersonApi()
const { data: business } = await getBusinessApi()
const orderShow = ref<boolean>(false)

const originData = ref([])

watch(shoppingStore.shopping, () => {
  if (shoppingStore.shopping !== undefined) {
    shopping.value = shoppingStore.shopping?.flat()
  }
})

watch(
  business,
  async () => {
    items.value = business?.value
      ?.map((item: any) => ({
        ...item,
        text: item.name
      }))
      ?.filter((item) => item.type === '食堂')
    if (items.value !== undefined) {
      const { data } = await getMenuPublicByBusinessApi(items?.value[activeIndex.value].id)
      goods.value = data.value
      originData.value = data.value
      status.value = items?.value[activeIndex.value].status
    }
  },
  { immediate: true }
)

watch(activeIndex, async () => {
  const { data } = await getMenuPublicByBusinessApi(items?.value[activeIndex.value].id)
  goods.value = data.value
  originData.value = data.value
  status.value = items?.value[activeIndex.value].status
})

function onSearch() {
  goods.value = originData.value.filter((item) => item.title.includes(searchValue.value))
}

function onCancel() {
  goods.value = originData.value
}

function onSubmit() {
  orderShow.value = true
}

function handleGoodDetail(id: any) {
  if (status.value) {
    router.push(`/takeaway/${id}`)
  } else {
    showFailToast('商家已打烊')
  }
}

function handleMinus(item: any) {
  if (item.quantity > 1) {
    shoppingStore.minusShopping(item.businessId, item.id)
  } else {
    showFailToast('不能再减少了')
  }
}

function handlePlus(item: any) {
  if (item.quantity < 99) {
    shoppingStore.plusShopping(item.businessId, item.id)
  } else {
    showSuccessToast('不能再增加了')
  }
}

function handleDelete(item: any) {
  // 找到商家id
  // 找到商品id，然后进行删除
  const businessId = item.businessId
  const goodId = item.id
  shoppingStore.deleteShopping(businessId, goodId)
}
</script>

<template>
  <form action="/">
    <van-search
      v-model="searchValue"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>

  <van-tree-select
    v-model:main-active-index="activeIndex"
    class="min-h-screen mb-12"
    :items="items"
  >
    <template #content>
      <van-card
        v-for="item in goods"
        :price="item.price.toFixed(2)"
        :title="item.title"
        :thumb="item.photo"
        @click="handleGoodDetail(item.id)"
      >
        <template #desc>
          <div
            v-html="item.description"
            class="line-clamp-2"
          />
        </template>

        <template #footer>
          <van-button
            round
            type="primary"
            size="mini"
            class="w-[25px]"
          >
            <img :src="PlusIcon" />
          </van-button>
        </template>
      </van-card>
    </template>
  </van-tree-select>

  <van-submit-bar
    v-if="status == 1"
    :price="shoppingStore?.total"
    button-text="提交订单"
    @submit="onSubmit"
  >
    <img
      :src="ShoppingCarIcon"
      @click="show = true"
    />
  </van-submit-bar>

  <van-submit-bar
    v-if="status == 0"
    button-text="打烊了"
  />

  <van-action-sheet
    v-model:show="show"
    title="购物车"
  >
    <van-cell
      icon="location-o"
      is-link
      class="flex items-center"
    >
      <template #title>
        <span
          class="line-clamp-2"
          @click="navigateTo('/setting/addresslist')"
        >
          地址：{{ person?.Address[0]?.detail }}
        </span>
      </template>
    </van-cell>

    <van-checkbox-group
      v-model="checked"
      shape="square"
      class="p-3"
      v-for="item in shopping"
    >
      <van-swipe-cell class="relative">
        <van-card
          style="margin-left: 15px"
          :num="item?.quantity"
          :price="item?.price.toFixed(2)"
          :title="item?.title"
          class="goods-card"
          :thumb="item?.photo"
        >
          <template #desc>
            <div
              v-html="item?.description"
              class="line-clamp-2"
            />
          </template>

          <template #footer>
            <van-button
              round
              type="primary"
              size="mini"
              class="w-[25px]"
              @click="handleMinus(item)"
            >
              <img :src="MinusIcon" />
            </van-button>
            <van-button
              round
              type="primary"
              size="mini"
              class="w-[25px]"
              @click="handlePlus(item)"
            >
              <img :src="PlusIcon" />
            </van-button>
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="handleDelete(item)"
          />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
  </van-action-sheet>

  <order-popup v-model="orderShow" />
</template>

<style>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>
