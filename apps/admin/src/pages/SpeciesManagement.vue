<script setup>
import { ref, onMounted } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { addSpeciesApi, getSpeciesApi, updateSpeciesApi, deleteSpeciesApi } from '@/api'
const addOpen = ref(false)
const updateOpen = ref(false)
const addSpecies = ref({})
const updateSpecies = ref()
const columns = ref([
  {
    title: '种类编号s',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '种类名称',
    dataIndex: 'label',
    key: 'label'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  }
])
const speciesData = ref([])
const search = ref()
const originData = ref([])

onMounted(async () => {
  initData()
})

const initData = async () => {
  const { data } = await getSpeciesApi()
  if (data.status === undefined) {
    speciesData.value = data
    originData.value = [...speciesData.value]
  }
}

const onSearch = () => {
  speciesData.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.label)
  })
}

const handleUpdate = (record) => {
  updateSpecies.value = { ...record }
  updateOpen.value = true
}

// 删除确认框
const dismiss = async (id) => {
  const { data } = await deleteSpeciesApi(id)
  if (data.statusCode === undefined) {
    speciesData.value = speciesData.value.filter((value) => value.id != id)
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
}

// 添加商品种类
const handlerAddSave = async () => {
  const species = addSpecies.value
  if (!species.label) {
    message.error('请填写完整')
  } else {
    const { data } = await addSpeciesApi({
      label: species.label
    })
    if (data.statusCode === undefined) {
      message.success('添加成功')
      addOpen.value = false
      await initData()
      addSpecies.value = { label: '' }
    } else {
      message.error(data.message)
    }
  }
}

const handleUpdateSave = async () => {
  const species = updateSpecies.value
  if (!species.label) {
    message.error('请填写完整')
  } else {
    const { data } = await updateSpeciesApi(species.id, {
      label: species.label
    })
    if (data.statusCode === undefined) {
      message.success('修改成功')
      updateOpen.value = false
      await initData()
    } else {
      message.error(data.message)
    }
  }
}
</script>

<template>
  <div style="margin-bottom: 10px; display: flex; justify-content: space-between">
    <a-input-search
      v-model:value="search"
      placeholder="请输入种类"
      enter-button="搜索"
      size="large"
      @search="onSearch"
      style="margin-bottom: 5px; width: 300px"
    />
    <a-button
      type="primary"
      @click="addOpen = true"
      >添加商品种类</a-button
    >
  </div>

  <a-table
    :columns="columns"
    :data-source="speciesData"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span> 商品种类编号 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button
          type="primary"
          style="margin-left: 20px"
          @click="handleUpdate(record)"
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

  <a-modal
    v-model:open="addOpen"
    title="添加商品种类"
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
        <span style="display: inline-block; width: 100px">商品种类姓名：</span>
        <a-input
          v-model:value="addSpecies.label"
          style="width: 200px"
        />
      </div>
    </div>
  </a-modal>

  <a-modal
    v-model:open="updateOpen"
    title="修改商品种类信息"
    style="text-align: center"
  >
    <template #footer>
      <a-button
        key="back"
        @click="updateOpen = false"
      >
        取消
      </a-button>
      <a-button
        key="submit"
        type="primary"
        @click="handleUpdateSave"
      >
        确定
      </a-button>
    </template>
    <div style="text-align: left; padding-left: 40px">
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 100px">商品种类姓名：</span>
        <a-input
          v-model:value="updateSpecies.label"
          style="width: 200px"
        />
      </div>
    </div>
  </a-modal>
</template>
