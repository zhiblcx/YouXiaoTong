<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { addBusinessApi, getBusinessApi, updateBusinessApi, deleteBusinessApi, showBusinessMenuApi } from '@/api'
import { showBusinessSystemAPi } from '../api'
import * as echarts from 'echarts'

const options = ref([
  {
    value: '食堂',
    label: '食堂'
  },
  {
    value: '水电',
    label: '水电'
  }
])
const columns2 = ref([
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
  }
])
const addOpen = ref(false)
const updateOpen = ref(false)
const sevenTurnoverOpen = ref(false)
const addBusiness = ref({ name: '', staff: '', phone: '', type: options.value[0].value })
const updateBusiness = ref()
const showMenuOpen = ref(false)
const businessMenuData = ref([])
const saleLine = ref()

const columns = ref([
  {
    title: '商家号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '员工数量',
    dataIndex: 'staff',
    key: 'staff'
  },
  {
    title: '是否营业',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  }
])
const businessData = ref([])
const search = ref()
const originData = ref([])
let saleLineChat

onMounted(async () => {
  initData()
})

const initData = async () => {
  const { data } = await getBusinessApi()
  if (data.status === undefined) {
    businessData.value = data
    originData.value = [...businessData.value]
  }
}

const onSearch = () => {
  businessData.value = originData.value.filter((item) => {
    const searchValue = search.value
    const regex = new RegExp(searchValue, 'i')
    return regex.test(item.name)
  })
}

const handleUpdate = (record) => {
  updateBusiness.value = { ...record }
  updateBusiness.value.type = { ...options.value.find((item) => item.value === record.type) }
  updateOpen.value = true
}

// 删除确认框
const dismiss = async (id) => {
  const { data } = await deleteBusinessApi(id)
  if (data.statusCode === undefined) {
    businessData.value = businessData.value.filter((value) => value.id != id)
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
}

// 添加商家
const handlerAddSave = async () => {
  const phoneRegex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  const business = addBusiness.value
  if (!business.name || !business.phone || !business.staff) {
    message.error('请填写完整')
  } else if (phoneRegex.test(business.phone)) {
    if (businessData.value.find((item) => item.type === '水电')) {
      return message.error('已经有水电商家了 ')
    }
    const { data } = await addBusinessApi({
      name: business.name,
      phone: business.phone,
      staff: business.staff,
      type: business.type
    })
    if (data.statusCode === undefined) {
      message.success('添加成功')
      addOpen.value = false
      await initData()
      addBusiness.value = { name: '', staff: '', phone: '', type: options.value[0].value }
    } else {
      message.error(data.message)
    }
  } else {
    message.error('请输入正确的手机号码')
  }
}

const handleMenu = async (record) => {
  showMenuOpen.value = true
  const { data: result } = await showBusinessMenuApi(record.id)
  if (result.statusCode === undefined) {
    businessMenuData.value = result
  }
}

const handleUpdateSave = async () => {
  const phoneRegex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  const business = updateBusiness.value
  if (!business.name || !business.phone || !business.staff) {
    message.error('请填写完整')
  } else if (phoneRegex.test(business.phone)) {
    const { data } = await updateBusinessApi(business.id, {
      name: business.name,
      phone: business.phone,
      staff: business.staff,
      type: business.type.value
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

const handleSevenTurnover = async (record) => {
  sevenTurnoverOpen.value = true
  const { data: result } = await showBusinessSystemAPi(record.id)

  nextTick(() => {
    if (saleLine.value) {
      if (saleLineChat) {
        saleLineChat.dispose()
      }

      saleLineChat = echarts.init(saleLine.value)
      const option = {
        title: {
          text: '近七天营业额',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'category',
          data: result.sevenDayMoney?.map((item) => item.timer) ?? []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: result.sevenDayMoney?.map((item) => item.money) ?? [],
            type: 'line'
          }
        ]
      }

      option && saleLineChat.setOption(option)
    }
  })
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
      >添加商家</a-button
    >
  </div>

  <a-table
    :columns="columns"
    :data-source="businessData"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span> 商家号 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <a-tag :color="record.status ? 'green' : 'red'">
          {{ record.status ? '营业中' : '已打烊' }}
        </a-tag>
      </template>

      <template v-if="column.key === 'action'">
        <a-button
          type="primary"
          style="margin-left: 20px"
          v-if="record.type !== '水电'"
          @click="handleMenu(record)"
          >菜单</a-button
        >
        <a-button
          type="primary"
          style="margin-left: 20px"
          @click="handleSevenTurnover(record)"
          >七天营业额</a-button
        >
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
    title="添加商家"
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
        <span style="display: inline-block; width: 80px">商家姓名：</span>
        <a-input
          v-model:value="addBusiness.name"
          style="width: 200px"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">员工数量：</span>
        <a-input-number
          v-model:value="addBusiness.staff"
          :min="1"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">商家类型：</span>
        <a-select
          v-model:value="addBusiness.type"
          style="width: 120px"
          :options="options"
          @change="handleChange"
        ></a-select>
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 80px">电话号码</span>
        <a-input
          v-model:value="addBusiness.phone"
          style="width: 200px"
        />
      </div>
    </div>
  </a-modal>

  <a-modal
    v-model:open="updateOpen"
    title="修改商家信息"
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
        <span style="display: inline-block; width: 80px">商家姓名：</span>
        <a-input
          v-model:value="updateBusiness.name"
          style="width: 200px"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">员工数量：</span>
        <a-input-number
          v-model:value="updateBusiness.staff"
          :min="1"
        />
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px; display: flex">
        <span style="display: inline-block; width: 80px">商家类型：</span>
        <a-select
          v-model:value="updateBusiness.type"
          style="width: 120px"
          :options="options"
          @change="handleChange"
        ></a-select>
      </div>
      <div style="margin-bottom: 20px; margin-top: 20px">
        <span style="display: inline-block; width: 80px">电话号码</span>
        <a-input
          v-model:value="updateBusiness.phone"
          style="width: 200px"
        />
      </div>
    </div>
  </a-modal>

  <a-modal
    v-model:open="showMenuOpen"
    title="菜单"
    style="text-align: center"
  >
    <template #footer> </template>
    <a-table
      :columns="columns2"
      :data-source="businessMenuData"
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
          {{ record.status ? '上架' : '下架' }}
        </template>
      </template>
    </a-table>
  </a-modal>

  <a-modal
    v-model:open="sevenTurnoverOpen"
    style="text-align: center; width: 600px"
  >
    <template #footer> </template>
    <div
      ref="saleLine"
      class="w-[600px] h-[400px]"
    />
  </a-modal>
</template>
