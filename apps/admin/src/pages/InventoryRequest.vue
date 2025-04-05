<script setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { addApplicationApi, getApplicationTransporterApi, getBusinessApi, getSpeciesApi, addStockApi } from '@/api'
import dayjs from 'dayjs'

const options = ref([])
const options2 = ref([])
const addOpen = ref(false)
const addInventory = ref({ stockName: '', num: '', type: '入库' })
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
const inventoryData = ref([])
const search = ref()
const originData = ref([])

onMounted(async () => {
  const { data } = await getBusinessApi()
  const { data: data2 } = await getSpeciesApi()
  if (data.status === undefined) {
    options.value = data.map((item) => ({
      value: item.id,
      label: item.id
    }))
  }

  if (data2.status === undefined) {
    options2.value = data2.map((item) => ({
      value: item.id,
      label: item.label
    }))
  }
  initData()
})

const initData = async () => {
  const { data } = await getApplicationTransporterApi()
  if (data.status === undefined) {
    inventoryData.value = data.reverse()
    inventoryData.value = Array.isArray(data) ? data : []
    originData.value = [...inventoryData.value]
  }
}

const onSearch = () => {
  inventoryData.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.id)
  })
}

// 添加申请
const handlerAddSave = async () => {
  const inventory = addInventory.value
  if (!inventory.stockName || !inventory.num || !inventory.businessId || !inventory.species || !inventory.timer) {
    message.error('请填写完整')
  } else {
    const { data } = await addStockApi({
      goodName: inventory.stockName,
      num: inventory.num,
      businessId: inventory.businessId,
      speciesId: inventory.species,
      startTime: new Date(inventory.timer[0].$d),
      endTime: new Date(inventory.timer[1].$d)
    })
    if (data.statusCode === undefined) {
      const { data: data2 } = await addApplicationApi({
        stockId: data.id,
        type: inventory.type
      })
      if (data2.statusCode === undefined) {
        message.success('添加成功')
        addOpen.value = false
        await initData()
        addInventory.value = { stockName: '', num: '', businessId: undefined, species: undefined, timer: undefined }
      } else {
        message.error(data.message)
      }
    }
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
      >添加申请</a-button
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
        <a-tag :color="record.type === '入库' ? 'green' : 'red'">
          {{ record.type }}
        </a-tag>
      </template>

      <template v-if="column.key === 'status'">
        <div :style="{ color: record.status === 1 ? 'green' : record.status === 2 ? 'red' : '' }">
          {{ record.status === 0 ? '申请中' : record.status === 1 ? '已成功' : record.status === 2 ? '已拒绝' : '' }}
        </div>
      </template>

      <template v-if="column.key === 'num'">
        {{ record.Stock[0].num }}
      </template>

      <template v-if="column.key === 'goodName'">
        {{ record.Stock[0].goodName }}
      </template>

      <template v-if="column.key === 'startTime'">
        {{ dayjs(record.Stock[0].startTime).format('YYYY-MM-DD') }}
      </template>

      <template v-if="column.key === 'endTime'">
        {{ dayjs(record.Stock[0].endTime).format('YYYY-MM-DD') }}
      </template>
    </template>
  </a-table>

  <a-modal
    v-model:open="addOpen"
    title="添加申请"
    style="text-align: center"
  >
    <template #footer>
      <a-button
        key="back"
        @click="addOpen = false"
        >取消</a-button
      >
      <a-button
        key="submit"
        type="primary"
        @click="handlerAddSave"
        >确定</a-button
      >
    </template>
    <div style="text-align: left; padding-left: 40px">
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 80px">商品名称：</span>
        <a-input
          v-model:value="addInventory.stockName"
          style="width: 200px"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">数量：</span>
        <a-input-number
          v-model:value="addInventory.num"
          :min="1"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 80px">商品种类：</span>
        <a-select
          v-model:value="addInventory.species"
          style="width: 120px"
          :options="options2"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">商家编号：</span>
        <a-select
          v-model:value="addInventory.businessId"
          style="width: 120px"
          :options="options"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">保质期：</span>
        <a-range-picker
          :placeholder="['开始时间', '结束时间']"
          v-model:value="addInventory.timer"
          :format="dateFormat"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">出入库：</span>
        <a-radio-group
          v-model:value="addInventory.type"
          name="radioGroup"
        >
          <a-radio value="入库">入库</a-radio>
          <a-radio value="出库">出库</a-radio>
        </a-radio-group>
      </div>
    </div>
  </a-modal>
</template>
