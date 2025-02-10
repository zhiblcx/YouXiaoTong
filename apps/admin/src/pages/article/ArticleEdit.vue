<script setup>
import { ref, onMounted } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { showAllArticle, deleteArticleApi } from '../../api'
import { useRouter } from 'vue-router'

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
    title: '文章类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true
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
  const result = await showAllArticle()
  if (result.data.code == 200) {
    data.value = result.data.data
    originData.value = [...data.value]
  }
})

const onSearch = () => {
  data.value = originData.value.filter(item => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.type)
  })
}

// 删除确认框
const dismiss = async id => {
  const result = await deleteArticleApi(id)
  if (result.data.code == 200) {
    data.value = data.value.filter(value => value.id != id)
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
}
</script>

<template>
  <div>
    <a-input-search v-model:value="search" placeholder="请输入类型" enter-button="搜索" size="large" @search="onSearch" style="margin-bottom: 5px; width: 300px" />
    <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'id'">
          <span> 文章编号 </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'picture'">
          <a-avatar shape="square" :size="64" :src="'http://127.0.0.1:3000/' + record.picture"> </a-avatar>
        </template>

        <template v-else-if="column.key === 'action'">
          <a-button type="primary" style="margin-left: 20px" @click="router.push(`/article/addarticle?id=${record.id}`)">修改</a-button>
          <a-popconfirm title="确认删除吗?" ok-text="删除" cancel-text="取消" @confirm="dismiss(record.id)">
            <template #icon><question-circle-outlined style="color: red" /></template>
            <a-button type="primary" danger style="margin-left: 20px">删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
