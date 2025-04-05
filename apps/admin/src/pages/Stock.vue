<script setup>
import { ref, onMounted } from 'vue'
import { getAllStockApi } from '@/api'

const columns = ref([
  {
    title: '商品名称',
    dataIndex: 'goodName',
    key: 'goodName'
  },
  {
    title: '商品种类',
    dataIndex: 'species',
    key: 'species'
  },
  {
    title: '数量',
    dataIndex: 'num',
    key: 'num'
  }
])
const data = ref([])

onMounted(async () => {
  const { data: result } = await getAllStockApi()
  if (result.statusCode === undefined) {
    data.value = result
  }
})
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="data"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span> 编号 </span>
      </template>
    </template>
  </a-table>
</template>
