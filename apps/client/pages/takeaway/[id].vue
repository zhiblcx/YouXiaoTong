<script setup lang="ts">
import LoginImg from '@/assets/images/login.jpg'
</script>

<template>
  <div class="min-h-screen relative">
    <img
      :src="LoginImg"
      class="h-[200px] w-screen object-cover"
    />
    <div class="p-2 text-lg font-bold">商品名称：青椒炒肉</div>
    <div class="p-2">
      <div>商品详情：</div>
      <div>
        辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了辣死了v
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-button
        color="#00a1d6"
        type="warning"
        text="加入购物车"
      />
      <van-action-bar-button
        color="#fb86a7"
        type="danger"
        text="立即购买"
      />
    </van-action-bar>
  </div>
</template>

<style scoped></style>
