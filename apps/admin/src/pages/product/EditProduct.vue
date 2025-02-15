<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMenuApi } from '@/api'
import { showPersonApi, updateMenuStatusApi, deleteMenuApi } from '@/api'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

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
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '单价',
    dataIndex: 'price',
    key: 'price'
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
const router = useRouter()

onMounted(async () => {
  const { data: result } = await getMenuApi()
  if (result.statusCode === undefined) {
    data.value = result
    originData.value = [...data.value]
  }
})

const onSearch = () => {
  data.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.title)
  })
}

const handleStatus = async (record) => {
  const { data: result } = await updateMenuStatusApi(record.id, record.status)
  if (result.statusCode === undefined) {
    message.success('修改状态成功')
  } else {
    message.error('修改失败')
  }
}

// 删除确认框
const dismiss = async (id) => {
  const { data: result } = await deleteMenuApi(id)
  if (result.statusCode === undefined) {
    data.value = data.value.filter((value) => value.id != id)
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
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
          :src="record.photo"
          class="w-[50px] h-[50px] object-cover"
        />
      </template>

      <template v-if="column.key === 'price'">
        <span> ￥{{ record.price.toFixed(2) }} </span>
      </template>

      <template v-if="column.key === 'status'">
        <a-switch
          v-model:checked="record.status"
          checked-children="上架"
          un-checked-children="下架"
          @click="() => handleStatus(record)"
        />
      </template>

      <template v-if="column.key === 'action'">
        <a-button
          type="primary"
          style="margin-left: 20px"
          @click="router.push(`/product/addproduct?id=${record.id}`)"
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
