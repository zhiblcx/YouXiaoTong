<script setup>
import { ref, onMounted } from 'vue'
import { getApplicationBusinessApi, updateApplicationApi, getStockApi } from '@/api'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const addOpen = ref(false)
const data2 = ref([])
const columns = ref([
  {
    title: '申请号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '商品名称',
    dataIndex: 'goodName',
    key: 'goodName'
  },
  {
    title: '数量',
    dataIndex: 'num',
    key: 'num'
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime'
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime'
  },
  {
    title: '运输人员',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '出入库',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }
])

const columns2 = ref([
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
const inventoryData = ref([])
const search = ref()
const originData = ref([])

onMounted(async () => {
  initData()
})

const initData = async () => {
  const { data } = await getApplicationBusinessApi()
  if (data.status === undefined) {
    inventoryData.value = data.reverse()
    inventoryData.value = Array.isArray(data) ? data : []
    originData.value = [...inventoryData.value]
  }

  const { data: result } = await getStockApi()
  if (result.statusCode === undefined) {
    data2.value = result
  }
}

const onSearch = () => {
  inventoryData.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.id)
  })
}

const handleApplication = async (id, status) => {
  const { data } = await updateApplicationApi(id, status)
  if (data.statusCode === undefined) {
    message.success('修改成功')
    addOpen.value = false
    await initData()
  } else {
    message.error(data.message)
  }
}
</script>

<template>
  <div style="margin-bottom: 10px; display: flex; justify-content: space-between">
    <a-input-search
      v-model:value="search"
      placeholder="请输入编号"
      enter-button="搜索"
      size="large"
      @search="onSearch"
      style="margin-bottom: 5px; width: 300px"
    />
    <a-button
      type="primary"
      @click="addOpen = true"
      >查看库存</a-button
    >
  </div>

  <a-table
    :columns="columns"
    :data-source="inventoryData"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span> 申请编号 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'type'">
        <a-tag :color="record.Application.type === '入库' ? 'green' : 'red'">
          {{ record.Application.type }}
        </a-tag>
      </template>

      <template v-if="column.key === 'num'">
        {{ record.num }}
      </template>

      <template v-if="column.key === 'name'">
        {{ record.transporter.name }}
      </template>

      <template v-if="column.key === 'goodName'">
        {{ record.goodName }}
      </template>

      <template v-if="column.key === 'startTime'">
        {{ dayjs(record.startTime).format('YYYY-MM-DD') }}
      </template>

      <template v-if="column.key === 'endTime'">
        {{ dayjs(record.endTime).format('YYYY-MM-DD') }}
      </template>

      <template v-if="column.key === 'status'">
        <template v-if="record.Application.status === 0">
          <a-button
            type="primary"
            style="margin-left: 20px"
            @click="handleApplication(record.Application.id, 1)"
            >同意</a-button
          >

          <a-popconfirm
            title="确认删除吗?"
            ok-text="删除"
            cancel-text="取消"
            @confirm="handleApplication(record.Application.id, 2)"
          >
            <template #icon><question-circle-outlined style="color: red" /></template>
            <a-button
              type="primary"
              danger
              style="margin-left: 20px"
              >删除</a-button
            >
          </a-popconfirm>
        </template>
        <template v-else>
          <div :style="{ color: record.Application.status === 1 ? 'green' : 'red' }">
            {{ record.Application.status === 1 ? '已同意' : record.Application.status === 2 ? '已拒绝' : '' }}
          </div>
        </template>
      </template>
    </template>
  </a-table>

  <a-modal
    v-model:open="addOpen"
    title="全部库存"
    style="text-align: center"
  >
    <template #footer> </template>
    <a-table
      :columns="columns2"
      :data-source="data2"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'id'">
          <span> 编号 </span>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
