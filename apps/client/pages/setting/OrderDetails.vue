<script setup lang="ts">
import dayjs from 'dayjs'
import { showStudentOrderApi } from '~/composables/auth'

const { data: orderList } = await showStudentOrderApi()
</script>

<template>
  <div class="bg-[#f5f5f5] min-h-screen p-3">
    <div
      class="p-4 bg-[white] shadow-lg rounded-lg mb-3"
      v-for="item in orderList"
    >
      <div class="flex justify-between mb-2">
        <div>商家：{{ item.Business.name }}</div>
        <div class="text-[#999]">{{ item.status }}</div>
      </div>
      <div>地址：{{ item.address?.detail }}</div>
      <div class="flex flex-wrap">
        <img
          v-for="item2 in item.orderItems"
          :src="item2.menu.photo"
          class="object-cover w-[60px] h-[60px] rounded-lg m-1"
        />
      </div>
      <div class="text-sm text-[#999] mt-2">留言：{{ item.note }}</div>
      <div class="flex justify-between text-[#999] text-sm mt-3">
        <div>{{ dayjs(item.timer).format('YYYY-MM-DD HH:mm') }}</div>
        <div>
          <span>共{{ item.quantity }}件</span>
          <span class="text-black font-bold ml-2">¥ {{ item.total.toFixed(2) }}</span>
        </div>
      </div>
      <div class="text-right mt-2">
        <van-button
          type="primary"
          size="small"
          v-if="item.status !== '派送中'"
          @click="navigateTo('/takeaway')"
        >
          再来一单
        </van-button>
      </div>
    </div>
  </div>
</template>
