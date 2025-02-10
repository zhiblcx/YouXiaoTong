<script setup lang="ts">
import PlusIcon from '@/assets/images/plus-icon.png'
import MinusIcon from '@/assets/images/miuns-icon.png'
import ShoppingCarIcon from '@/assets/images/shopping-card-icon.png'
import LoginImg from '@/assets/images/login.jpg'

const router = useRouter()
const activeIndex = ref<number>(0)
const show = ref(false)
const searchValue = ref()
const checked = ref()

const items = ref([
  { text: '分组 1' },
  { text: '分组 2' },
  { text: '分组 2' },
  { text: '分组 4' },
  { text: '分组 5' },
  { text: '分组 6' },
  { text: '分组 7' },
  { text: '分组 8' },
  { text: '分组 9' },
  { text: '分组 10' },
  { text: '分组 11' },
  { text: '分组 12' },
  { text: '分组 13' },
  { text: '分组 14' },
  { text: '分组 15' },
  { text: '分组 16' },
  { text: '分组 17' },
  { text: '分组 18' },
  { text: '分组 19' }
])

const goods = ref([
  { title: '商品1' },
  { title: '商品2' },
  { title: '商品3' },
  { title: '商品4' },
  { title: '商品5' },
  { title: '商品6' },
  { title: '商品7' },
  { title: '商品8' },
  { title: '商品9' },
  { title: '商品10' },
  { title: '商品11' },
  { title: '商品12' },
  { title: '商品13' },
  { title: '商品14' },
  { title: '商品15' },
  { title: '商品16' },
  { title: '商品17' },
  { title: '商品18' },
  { title: '商品19' }
])

function onSearch() {}

function onCancel() {}

function onSubmit() {}
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
        tag="热卖"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        :thumb="LoginImg"
        @click="router.push('/takeaway/1')"
      >
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
    :price="3050"
    button-text="提交订单"
    @submit="onSubmit"
  >
    <img
      :src="ShoppingCarIcon"
      @click="show = true"
    />
  </van-submit-bar>

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
        <span class="line-clamp-2"
          >地址：事实上事实上少时诵诗书是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒"</span
        >
      </template></van-cell
    >

    <van-checkbox-group
      v-model="checked"
      shape="square"
      class="p-3"
      v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
    >
      <van-swipe-cell class="relative">
        <van-checkbox
          name="a"
          class="absolute top-[40px] left-0 z-50"
        />
        <van-card
          style="margin-left: 15px"
          num="1"
          price="2.00"
          desc="描述信息2222222222222222222222222222222"
          title="商品标题"
          class="goods-card"
          :thumb="LoginImg"
        >
          <template #footer>
            <van-button
              round
              type="primary"
              size="mini"
              class="w-[25px]"
            >
              <img :src="MinusIcon" />
            </van-button>
            <van-button
              round
              type="primary"
              size="mini"
              class="w-[25px]"
            >
              <img :src="PlusIcon" /> </van-button
          ></template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
  </van-action-sheet>
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
