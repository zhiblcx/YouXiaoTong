<script setup lang="ts">
import { onMounted, ref } from 'vue'

const addOpen = ref(false)
const addProduct = ref({ name: '', sex: 1 })

const columns = ref([
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '图片',
    dataIndex: 'pic',
    key: 'pic'
  },
  {
    title: '菜名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '单价',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '详情',
    dataIndex: 'detail',
    key: 'detail',
    ellipsis: true
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
      name: '张三',
      price: 12.22,
      phone: '182555550',
      detail: '菜单详情，菜单详情，菜单详单详情，菜单详情菜单详情'
    },
    {
      id: '1012',
      name: '张四',
      price: 18.58,
      phone: '182555550',
      detail: '菜单详情，菜单详情，菜单详单详情，菜单详情菜单详情'
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

const handleStatus = (record) => {
  console.log(record)
}
</script>

<template>
  <div style="margin-bottom: 10px; display: flex; justify-content: space-between">
    <a-input-search
      v-model:value="search"
      placeholder="请输入菜名"
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
        <span> 编号 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'pic'">
        <img
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          class="w-[50px] h-[50px] object-cover"
        />
      </template>

      <template v-if="column.key === 'status'">
        <a-switch
          v-model:checked="record.status"
          checked-children="发布"
          un-checked-children="停售"
          @click="() => handleStatus(record)"
        />
      </template>

      <template v-if="column.key === 'action'">
        <a-button
          type="primary"
          style="margin-left: 20px"
          >修改</a-button
        >
        <a-popconfirm
          title="确认删除吗?"
          ok-text="删除"
          cancel-text="取消"
          @confirm="dismiss(record.id)"
        >
          <template #icon>
            <question-circle-outlined style="color: red" />
          </template>
          <a-button
            type="primary"
            danger
            style="margin-left: 20px"
            >删除</a-button
          >
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>
