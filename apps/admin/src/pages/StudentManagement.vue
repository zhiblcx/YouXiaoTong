<script setup>
import { ref, onMounted } from 'vue'
import { showAllUserApi, deleteUserApi } from '../api'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const addOpen = ref(false)
const addStudent = ref({ name: '', sex: 1 })

const columns = ref([
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '宿舍号',
    dataIndex: 'dormitory',
    key: 'dormitory'
  },
  {
    title: '余额',
    dataIndex: 'balance',
    key: 'balance'
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
      sex: '男',
      age: 18,
      phone: '182555550',
      dormitory: '1-101',
      balance: 1000
    },
    {
      id: '1012',
      name: '张四',
      sex: '男',
      age: 18,
      phone: '182555550',
      dormitory: '1-101',
      balance: 1000
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

// 删除确认框
const dismiss = async (id) => {
  const result = await deleteUserApi(id)
  console.log(result)
  if (result.data.code == 200) {
    data.value = data.value.filter((value) => value.id != id)
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
}

// 添加学生
const handlerAddSave = () => {}
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
      >添加学生</a-button
    >
  </div>

  <a-table
    :columns="columns"
    :data-source="data"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span> 学号 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
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
    title="添加学生"
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
        <span style="display: inline-block; width: 80px">学生姓名：</span>
        <a-input
          v-model:value="addStudent.name"
          style="width: 200px"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">年龄：</span>
        <a-input-number
          v-model:value="addStudent.age"
          :min="1"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">性别：</span>
        <a-radio-group v-model:value="addStudent.sex">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="2">女</a-radio>
        </a-radio-group>
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 80px">宿舍号：</span>
        <a-input
          v-model:value="addStudent.dormitory"
          style="width: 200px"
        />
      </div>
    </div>
  </a-modal>
</template>
