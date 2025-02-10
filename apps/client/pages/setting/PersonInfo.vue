<script setup lang="ts">
import PersonInfoImg from '@/assets/images/person-info.png'
</script>

<template>
  <img
    class="rounded-lg absolute top-[-30px]"
    :src="PersonInfoImg"
  />
  <van-cell-group class="mt-[250px]">
    <van-cell
      title="学号"
      value="20250209"
    />
    <van-cell
      title="姓名"
      value="张三"
    />
    <van-cell
      title="性别"
      value="男"
    />
    <van-cell
      title="年龄"
      value="18"
    />
    <van-cell
      title="宿舍"
      value="15栋405"
    />
  </van-cell-group>
</template>
