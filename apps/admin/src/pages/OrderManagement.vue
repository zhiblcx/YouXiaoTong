<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { showBusinessOrderApi, updateOrderStatus } from '../api'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
const orderDetailShow = ref(false)
const columns = ref([
  {
    title: '订单号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '联系人',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    ellipsis: true
  },
  {
    title: '价钱',
    dataIndex: 'total',
    key: 'total'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '下单时间',
    dataIndex: 'timer',
    key: 'timer'
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 200
  }
])
const data = ref([])
const search = ref()
const originData = ref([])
const selectOrder = ref({})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const { data: result } = await showBusinessOrderApi()
  if (result.statusCode == undefined) {
    data.value = result
    originData.value = [...data.value]
  }
}

const onSearch = () => {
  data.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.id)
  })
}

const handleDetail = (record) => {
  selectOrder.value = record
  orderDetailShow.value = true
}

const handleStatus = async (record) => {
  const { data: result } = await updateOrderStatus(record.id, '已送达')
  if (result.statusCode === undefined) {
    message.success('修改成功')
    await initData()
  } else {
    message.error('修改失败')
  }
}
</script>

<template>
  <div style="margin-bottom: 10px; display: flex; justify-content: space-between">
    <a-input-search
      v-model:value="search"
      placeholder="请输入订单号"
      enter-button="搜索"
      size="large"
      @search="onSearch"
      style="margin-bottom: 5px; width: 300px"
    />
  </div>

  <a-table
    :columns="columns"
    :data-source="data"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span> 订单号 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'timer'">
        {{ dayjs(record.timer).format('YYYY-MM-DD HH:mm:ss') }}
      </template>

      <template v-if="column.key === 'name'">
        {{ record.address.name }}
      </template>

      <template v-if="column.key === 'phone'">
        {{ record.address.phone }}
      </template>

      <template v-if="column.key === 'note'">
        {{ !record.note ? '暂无备注' : record.note }}
      </template>

      <template v-if="column.key === 'action'">
        <a-button
          type="primary"
          @click="handleDetail(record)"
        >
          详情
        </a-button>
        <a-button
          v-if="record.status === '派送中'"
          type="primary"
          style="margin-left: 20px"
          @click="handleStatus(record)"
        >
          已送达
        </a-button>
      </template>
    </template>
  </a-table>

  <a-modal
    v-model:open="orderDetailShow"
    title="订单详情"
    style="text-align: center"
  >
    <template #footer>
      <a-button
        key="back"
        @click="orderDetailShow = false"
      >
        取消
      </a-button>
      <a-button
        key="submit"
        type="primary"
        @click="orderDetailShow = false"
      >
        确定
      </a-button>
    </template>
    <div style="text-align: left; padding-left: 40px">
      <div style="margin-bottom: 20px; margin-top: 20px">
        <ul>
          <li
            v-for="(item, index) in selectOrder.orderItems"
            :key="index"
          >
            <span class="text-base">{{ item.menu.title }}</span>
            <span> *{{ item.quantity }}</span>
          </li>
        </ul>
        <div>详细地址：{{ selectOrder.address.detail }}</div>
        <div>备注：{{ selectOrder.note }}</div>
      </div>
    </div>
  </a-modal>
</template>
