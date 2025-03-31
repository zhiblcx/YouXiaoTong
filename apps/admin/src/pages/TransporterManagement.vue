<script setup>
import { ref, onMounted } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { addTransporterApi, getTransporterApi, updateTransporterApi, deleteTransporterApi } from '@/api'
const addOpen = ref(false)
const updateOpen = ref(false)
const addTransporter = ref({ name: '', phone: '' })
const updateTransporter = ref()
const columns = ref([
  {
    title: '运输员编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  }
])
const transporterData = ref([])
const search = ref()
const originData = ref([])

onMounted(async () => {
  initData()
})

const initData = async () => {
  const { data } = await getTransporterApi()
  if (data.status === undefined) {
    transporterData.value = data
    originData.value = [...transporterData.value]
  }
}

const onSearch = () => {
  transporterData.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.name)
  })
}

const handleUpdate = (record) => {
  updateTransporter.value = { ...record }
  updateOpen.value = true
}

// 删除确认框
const dismiss = async (id) => {
  const { data } = await deleteTransporterApi(id)
  if (data.statusCode === undefined) {
    transporterData.value = transporterData.value.filter((value) => value.id != id)
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
}

// 添加运输员
const handlerAddSave = async () => {
  const phoneRegex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  const transporter = addTransporter.value
  if (!transporter.name || !transporter.phone) {
    message.error('请填写完整')
  } else if (phoneRegex.test(transporter.phone)) {
    const { data } = await addTransporterApi({
      name: transporter.name,
      phone: transporter.phone
    })
    if (data.statusCode === undefined) {
      message.success('添加成功')
      addOpen.value = false
      await initData()
      addTransporter.value = { name: '', phone: '' }
    } else {
      message.error(data.message)
    }
  } else {
    message.error('请输入正确的手机号码')
  }
}

const handleUpdateSave = async () => {
  const phoneRegex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  const transporter = updateTransporter.value
  if (!transporter.name || !transporter.phone) {
    message.error('请填写完整')
  } else if (phoneRegex.test(transporter.phone)) {
    const { data } = await updateTransporterApi(transporter.id, {
      name: transporter.name,
      phone: transporter.phone
    })
    if (data.statusCode === undefined) {
      message.success('修改成功')
      updateOpen.value = false
      await initData()
    } else {
      message.error(data.message)
    }
  } else {
    message.error('请输入正确的手机号码')
  }
}
</script>

<template>
  <div style="margin-bottom: 10px; display: flex; justify-content: space-between">
    <a-input-search
      v-model:value="search"
      placeholder="请输入姓名"
      enter-button="搜索"
      size="large"
      @search="onSearch"
      style="margin-bottom: 5px; width: 300px"
    />
    <a-button
      type="primary"
      @click="addOpen = true"
      >添加运输员</a-button
    >
  </div>

  <a-table
    :columns="columns"
    :data-source="transporterData"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span> 运输员工编号 </span>
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
    title="添加运输员"
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
        <span style="display: inline-block; width: 100px">运输员姓名：</span>
        <a-input
          v-model:value="addTransporter.name"
          style="width: 200px"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 100px">电话号码</span>
        <a-input
          v-model:value="addTransporter.phone"
          style="width: 200px"
        />
      </div>
    </div>
  </a-modal>

  <a-modal
    v-model:open="updateOpen"
    title="修改运输员信息"
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
        <span style="display: inline-block; width: 100px">运输员姓名：</span>
        <a-input
          v-model:value="updateTransporter.name"
          style="width: 200px"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 100px">电话号码</span>
        <a-input
          v-model:value="updateTransporter.phone"
          style="width: 200px"
        />
      </div>
    </div>
  </a-modal>
</template>
