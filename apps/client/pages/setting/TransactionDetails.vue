<script setup lang="ts">
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)
const list = ref([
  {
    title: '食堂消费',
    timer: '2025/02/09 17:37',
    method: '二维码',
    money: -2.5
  },
  {
    title: '水费',
    timer: '2025/02/09 17:37',
    method: '校园卡',
    money: -2.5
  },
  {
    title: '电费',
    timer: '2025/02/09 17:37',
    method: '校园卡',
    money: -2.5
  },
  {
    title: '充值',
    timer: '2025/02/09 17:37',
    method: '校园卡',
    money: 2.57
  }
])

function onLoad() {}
</script>

<template>
  <div class="text-xl font-bold text-center mt-2">充值明细</div>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div
      class="flex items-center justify-between p-5"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="space-y-3">
        <div>{{ item.title }} - {{ item.method }}</div>
        <div class="text-sm text-[#999]">时间：{{ item.timer }}</div>
      </div>
      <div
        class="text-xl text-slate-500"
        v-if="item.money < 0"
      >
        {{ item.money.toFixed(2) }}
      </div>
      <div
        class="text-green-500 text-xl"
        v-else
      >
        +{{ item.money.toFixed(2) }}
      </div>
    </div>
  </van-list>
</template>
