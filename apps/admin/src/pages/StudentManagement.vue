<script setup>
import { ref, onMounted } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { getStudentApi, addStudentApi, deleteStudentApi, updateStudentApi } from '@/api'

const addOpen = ref(false)
const updateOpen = ref(false)
const addStudent = ref({ name: '', sex: 1, age: '', dormitory: '' })
const updateStudent = ref({})

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
const students = ref([])
const search = ref()
const originData = ref([])

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const { data } = await getStudentApi()
  if (data.status === undefined) {
    students.value = data
    originData.value = [...students.value]
  }
}

const onSearch = () => {
  students.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.name)
  })
}

// 删除确认框
const dismiss = async (id) => {
  const { data } = await deleteStudentApi(id)
  if (data.status === undefined) {
    students.value = students.value.filter((value) => value.id != id)
    message.success('删除成功')
  } else {
    message.error(data.message)
  }
}

// 添加学生
const handlerAddSave = async () => {
  const student = addStudent.value
  if (!student.name || !student.sex || !student.dormitory) {
    message.error('请填写完整')
  } else {
    const { data } = await addStudentApi({
      name: student.name,
      age: student.age,
      dormitory: student.dormitory,
      sex: student.sex === 1 ? '男' : '女'
    })
    if (data.status === undefined) {
      message.success('添加成功')
      addOpen.value = false
      await initData()
      addStudent.value = { name: '', sex: 1, age: '', dormitory: '' }
    } else {
      message.error(data.message)
    }
  }
}

// 修改学生按钮
const handleUpdateStudent = async (record) => {
  updateStudent.value = { ...record }
  updateStudent.value.sex = record.sex === '男' ? 1 : 2
  updateOpen.value = true
}

const handlerUpdate = async () => {
  const student = updateStudent.value
  if (!student.name || !student.sex || !student.dormitory) {
    message.error('请填写完整')
  } else {
    const { data } = await updateStudentApi(student.id, {
      name: student.name,
      age: student.age,
      dormitory: student.dormitory,
      sex: student.sex === 1 ? '男' : '女'
    })
    if (data.status === undefined) {
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
      placeholder="请输入姓名"
      enter-button="搜索"
      size="large"
      @search="onSearch"
      style="margin-bottom: 5px; width: 300px"
    />
    <a-button
      type="primary"
      @click="addOpen = true"
    >
      添加学生
    </a-button>
  </div>

  <a-table
    :columns="columns"
    :data-source="students"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span> 学号 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'balance'">
        {{ record.money.toFixed(2) }}
      </template>

      <template v-if="column.key === 'action'">
        <a-button
          type="primary"
          style="margin-left: 20px"
          @click="handleUpdateStudent(record)"
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

  <a-modal
    v-model:open="updateOpen"
    title="修改学生信息"
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
        @click="handlerUpdate"
      >
        确定
      </a-button>
    </template>
    <div style="text-align: left; padding-left: 40px">
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 80px">学生姓名：</span>
        <a-input
          v-model:value="updateStudent.name"
          style="width: 200px"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">年龄：</span>
        <a-input-number
          v-model:value="updateStudent.age"
          :min="1"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">性别：</span>
        <a-radio-group v-model:value="updateStudent.sex">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="2">女</a-radio>
        </a-radio-group>
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 80px">宿舍号：</span>
        <a-input
          v-model:value="updateStudent.dormitory"
          style="width: 200px"
        />
      </div>
    </div>
  </a-modal>
</template>
