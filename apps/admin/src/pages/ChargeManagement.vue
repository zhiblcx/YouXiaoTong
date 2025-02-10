<script setup>
import { ref, onMounted } from 'vue'
import { showAllUserApi, deleteUserApi } from '../api'

const columns = ref([
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id'
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
const originData = ref([])

onMounted(async () => {
  // const result = await showAllUserApi()
  // if (result.data.code == 200) {
  //   data.value = result.data.data
  //   originData.value = [...data.value]
  // }
  data.value = [
    {
      id: '1010',
      money: 1.25,
      method: '二维码',
      timer: '2025/02/10 20:24'
    },
    {
      id: '1012',
      money: 1.25,
      method: '堂食',
      status: false,
      timer: '2025/02/10 20:24'
    }
  ]

  originData.value = [...data.value]
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
