<script setup lang="ts">
import LoginImg from '@/assets/images/login.jpg'
</script>

<template>
  <div class="bg-[#f5f5f5] min-h-screen p-3">
    <div
      class="p-4 bg-[white] shadow-lg rounded-lg mb-3"
      v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
    >
      <div class="flex justify-between mb-2">
        <div>某商家</div>
        <div class="text-[#999]">派送中</div>
      </div>
      <div class="flex flex-wrap">
        <img
          v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          :src="LoginImg"
          class="object-cover w-[60px] h-[60px] rounded-lg m-1"
        />
      </div>
      <div class="flex justify-between text-[#999] text-sm mt-3">
        <div>2025/02/09 22:53</div>
        <div>
          <span>共1件</span>
          <span class="text-black font-bold ml-2">¥ 0.00</span>
        </div>
      </div>
      <div class="text-right mt-2">
        <van-button
          type="primary"
          size="small"
          >再来一单</van-button
        >
      </div>
    </div>
  </div>
</template>
