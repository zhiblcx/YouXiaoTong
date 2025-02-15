<script setup>
import { UserOutlined, MoneyCollectOutlined } from '@ant-design/icons-vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const orderPie = ref()
const saleLine = ref()
const utilityPie = ref()
let orderPieChat
let saleLineChat
let utilityPieChat

onMounted(() => {
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
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
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
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' }
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
        <a-card class="shadow-xl">
          <a-statistic
            class="w-[150px] h-[80px]"
            title="学生数量"
            value="11"
          >
            <template #prefix> <UserOutlined /> </template>
          </a-statistic>
        </a-card>

        <a-card class="shadow-xl">
          <a-statistic
            class="w-[150px] h-[80px]"
            title="商家数量"
            value="11"
          >
            <template #prefix> <UserOutlined /> </template>
          </a-statistic>
        </a-card>

        <a-card class="shadow-xl">
          <a-statistic
            class="w-[150px] h-[80px]"
            title="今天营业额"
            value="11"
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
    <a-card>
      <div
        ref="orderPie"
        class="w-[600px] h-[300px]"
      />
      <div
        ref="utilityPie"
        class="w-[600px] h-[300px]"
      />
    </a-card>
  </div>
</template>
