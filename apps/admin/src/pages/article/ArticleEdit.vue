<script setup>
import { ref, onMounted } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { getArticleApi, deleteArticleApi, updateArticleStatusApi } from '@/api'
import dayjs from 'dayjs'

const columns = ref([
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '文章图片',
    dataIndex: 'picture',
    key: 'picture'
  },
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true
  },
  {
    title: '发布时间',
    dataIndex: 'timer',
    key: 'timer'
  },
  {
    title: '文章状态',
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
  const { data: result } = await getArticleApi()
  if (result.statusCode == undefined) {
    data.value = result
    originData.value = [...data.value]
  }
})

const onSearch = () => {
  data.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.id)
  })
}

// 删除确认框
const dismiss = async (id) => {
  const { data: result } = await deleteArticleApi(id)
  if (result.statusCode === undefined) {
    data.value = data.value.filter((value) => value.id != id)
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
}

const changeStatus = async (record) => {
  const { data: result } = await updateArticleStatusApi(record.id, record.status)
  if (result.statusCode === undefined) {
    message.success('修改状态成功')
  } else {
    message.error('修改状态失败')
  }
}
</script>

<template>
  <div>
    <a-input-search
      v-model:value="search"
      placeholder="请输入编号"
      enter-button="搜索"
      size="large"
      @search="onSearch"
      style="margin-bottom: 5px; width: 300px"
    />
    <a-table
      :columns="columns"
      :data-source="data"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'id'">
          <span> 文章编号 </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'picture'">
          <a-avatar
            shape="square"
            :size="64"
            :src="record.photo"
          >
          </a-avatar>
        </template>

        <template v-if="column.key === 'timer'">
          {{ dayjs(record.timer).format('YYYY-MM-DD HH:mm') }}
        </template>

        <template v-if="column.key === 'status'">
          <a-switch
            v-model:checked="record.status"
            @change="changeStatus(record)"
          />
        </template>

        <template v-else-if="column.key === 'action'">
          <a-button
            type="primary"
            style="margin-left: 20px"
            @click="router.push(`/article/addarticle?id=${record.id}`)"
            >修改</a-button
          >
          <a-popconfirm
            title="确认删除吗?"
            ok-text="删除"
            cancel-text="取消"
            @confirm="dismiss(record.id)"
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
      </template>
    </a-table>
  </div>
</template>
