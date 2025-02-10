<script setup lang="ts">
import { onMounted, ref } from 'vue'

const orderDetailShow = ref(false)
const settingShow = ref(false)
const setting = ref({ logwork: 2.5, wrap: 2 })

const columns = ref([
  {
    title: '订单号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '菜名',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true
  },
  {
    title: '价钱',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  }
])

const data = ref([])
const search = ref()
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
      name: '辣椒炒肉 *1 火腿炒肉 *1',
      price: 12.22,
      phone: '182555550',
      note: '菜单详情，菜单详情，菜单详单详情，菜单详情菜单详情',
      status: '已取消'
    },
    {
      id: '1011',
      name: '张四',
      price: 18.58,
      phone: '182555550',
      note: '菜单详情，菜单详情，菜单详单详情，菜单详情菜单详情',
      status: '派送中'
    },
    {
      id: '1012',
      name: '张四',
      price: 18.58,
      phone: '182555550',
      note: '菜单详情，菜单详情，菜单详单详情，菜单详情菜单详情',
      status: '已完成'
    }
  ]

  originData.value = [...data.value]
})

const onSearch = () => {
  data.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.name)
  })
}

const handlerAddSave = () => {}

const handlerSetting = () => {
  console.log('设置确定')
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
    <a-button
      type="primary"
      @click="() => (settingShow = true)"
      >设置</a-button
    >
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
      <template v-if="column.key === 'action'">
        <a-button
          type="primary"
          @click="orderDetailShow = true"
          >详情</a-button
        >
        <a-button
          v-if="record.status === '派送中'"
          type="primary"
          style="margin-left: 20px"
          >已送达</a-button
        >
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
        <ul>
          <li
            v-for="(item, index) in ['辣椒炒肉', '火腿炒肉']"
            :key="index"
          >
            <span class="text-base">{{ item }}</span>
            <span> *2</span>
          </li>
        </ul>
        <div>备注：123121312456465123</div>
      </div>
    </div>
  </a-modal>

  <a-modal
    v-model:open="settingShow"
    title="设置"
    style="text-align: center"
  >
    <template #footer>
      <a-button
        key="back"
        @click="orderDetailShow = false"
        >取消</a-button
      >
      <a-button
        key="submit"
        type="primary"
        @click="handlerSetting"
        >确定</a-button
      >
    </template>
    <div style="text-align: left; padding-left: 40px">
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 80px">跑腿费：</span>
        <a-input-number
          precision="2"
          :min="0.5"
          v-model:value="setting.logwork"
          style="width: 200px"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 80px">打包费：</span>
        <a-input-number
          precision="2"
          :min="0.5"
          v-model:value="setting.wrap"
          style="width: 200px"
        />
      </div>
    </div>
  </a-modal>
</template>
