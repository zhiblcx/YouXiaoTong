<script setup lang="ts">
import { showTransactionApi } from '@/composables/auth'
import dayjs from 'dayjs'
const { data } = await showTransactionApi()
</script>

<template>
  <div class="text-xl font-bold text-center mt-2">充值明细</div>
  <van-list>
    <div
      class="flex items-center justify-between p-5"
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="space-y-3">
        <span>{{ item.type }} </span>
        <span v-if="item.type !== '充值'"> - {{ item.method }}</span>
        <div class="text-sm text-[#999]">时间：{{ dayjs(item.timer).format('YYYY-MM-DD HH:mm') }}</div>
      </div>
      <div
        class="text-xl text-slate-500"
        v-if="item.type !== '充值'"
      >
        -{{ item.money.toFixed(2) }}
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
