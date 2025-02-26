<script setup>
import { ref, onMounted } from 'vue'
import { showBusinessTransactionApi } from '@/api'
import dayjs from 'dayjs'

const columns = ref([
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '消费',
    dataIndex: 'money',
    key: 'money'
  },
  {
    title: '方式',
    dataIndex: 'method',
    key: 'method'
  },
  {
    title: '时间',
    dataIndex: 'timer',
    key: 'timer'
  }
])
const data = ref([])

onMounted(async () => {
  const { data: result } = await showBusinessTransactionApi()
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

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'timer'">
        {{ dayjs(record.timer).format('YYYY-MM-DD HH:mm') }}
      </template>

      <template v-if="column.key === 'money'">
        {{ record.money.toFixed(2) }}
      </template>
    </template>
  </a-table>
</template>
