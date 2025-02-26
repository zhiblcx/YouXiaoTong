<script setup lang="ts">
import dayjs from 'dayjs'
import { getArticleById } from '~/composables/article'
const route = useRoute()
const { data } = await getArticleById(Number(route.params.id))
</script>

<template>
  <div class="p-4">
    <div class="text-2xl font-bold text-center">{{ data?.title }}</div>
    <div class="text-[#999] text-right mt-2">{{ dayjs(data?.timer).format('YYYY/MM/DD HH:mm') }}</div>
  </div>
  <div class="p-4">
    <img
      :src="data?.photo"
      class="rounded-xl"
    />
  </div>
  <div class="p-4">
    <div v-html="data?.content"></div>
  </div>
</template>

<style scoped></style>
