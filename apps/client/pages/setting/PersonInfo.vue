<script setup lang="ts">
import PersonInfoImg from '@/assets/images/person-info.png'
import { ShowPersonApi } from '@/composables/auth'
const { data } = await ShowPersonApi()
</script>

<template>
  <img
    class="rounded-lg absolute top-[-30px]"
    :src="PersonInfoImg"
  />
  <van-cell-group class="mt-[250px]">
    <van-cell
      title="学号"
      :value="data?.id"
    />
    <van-cell
      title="姓名"
      :value="data?.name"
    />
    <van-cell
      title="性别"
      :value="data?.sex"
    />
    <van-cell
      title="年龄"
      :value="data?.age"
    />
    <van-cell
      title="宿舍"
      :value="data?.dormitory"
    />
  </van-cell-group>
</template>
