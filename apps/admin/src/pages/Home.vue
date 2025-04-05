<script setup>
import { UserOutlined, MoneyCollectOutlined } from '@ant-design/icons-vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { showSystemApi, showPersonApi, showBusinessSystemAPi } from '@/api'

const orderPie = ref()
const saleLine = ref()
const utilityPie = ref()
const currentData = ref({})
const currentPerson = ref({})
let orderPieChat
let saleLineChat
let utilityPieChat

onMounted(async () => {
  const { data: person } = await showPersonApi()
  if (person.statusCode === undefined) {
    currentPerson.value = person
    if (person.type != null) {
      // 水电 和 食堂商家
      const { data: result } = await showBusinessSystemAPi(person.id)
      currentData.value = result
    } else {
      // 管理员
      const { data: result } = await showSystemApi()
      if (result.statusCode === undefined) {
        currentData.value = result
      }
    }
  }

  if (orderPie.value) {
    if (orderPieChat) {
      orderPieChat.dispose()
    }

    orderPieChat = echarts.init(orderPie.value)
    const option = {
      title: {
        text: '菜品销售占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data:
            currentData.value.dishesSales?.map((item) => ({
              value: item.quantity,
              name: item.title
            })) ?? []
        }
      ]
    }

    option && orderPieChat.setOption(option)
  }

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
        data: currentData.value.sevenDayMoney?.map((item) => item.timer) ?? []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: currentData.value.sevenDayMoney?.map((item) => item.money) ?? [],
          type: 'line'
        }
      ]
    }

    option && saleLineChat.setOption(option)
  }

  if (utilityPie.value) {
    if (utilityPieChat) {
      utilityPieChat.dispose()
    }

    utilityPieChat = echarts.init(utilityPie.value)
    const option = {
      title: {
        text: '水电费销售占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: currentData.value?.waterTotal ?? 0, name: '水费' },
            { value: currentData.value?.lightningTotal ?? 0, name: '电费' }
          ]
        }
      ]
    }

    option && utilityPieChat.setOption(option)
  }
})
</script>

<template>
  <div class="flex">
    <div class="w-[50%]">
      <div class="flex justify-around h-[130px]">
        <a-card
          class="shadow-xl"
          v-if="currentPerson.account === 'admin'"
        >
          <a-statistic
            class="w-[150px] h-[80px]"
            title="学生数量"
            :value="currentData?.studentCount"
          >
            <template #prefix> <UserOutlined /> </template>
          </a-statistic>
        </a-card>

        <a-card
          class="shadow-xl"
          v-if="currentPerson.account === 'admin'"
        >
          <a-statistic
            class="w-[150px] h-[80px]"
            title="商家数量"
            :value="currentData?.businessCount"
          >
            <template #prefix> <UserOutlined /> </template>
          </a-statistic>
        </a-card>

        <a-card class="shadow-xl">
          <a-statistic
            class="w-[150px] h-[80px]"
            title="今天营业额"
            :value="currentData?.todayMoney"
          >
            <template #prefix> <MoneyCollectOutlined /> </template>
          </a-statistic>
        </a-card>
      </div>
      <div class="mt-[50px] flex justify-center">
        <div
          ref="saleLine"
          class="w-[600px] h-[400px]"
        />
      </div>
    </div>
    <a-card class="flex items-end">
      <div
        v-if="currentPerson?.account === 'admin' || currentPerson.type === '食堂'"
        ref="orderPie"
        class="w-[600px] h-[300px]"
      />
      <div
        v-if="currentPerson?.account === 'admin' || currentPerson.type === '水电'"
        ref="utilityPie"
        class="w-[600px] h-[300px]"
      />
    </a-card>
  </div>
</template>
