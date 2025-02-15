<script setup lang="ts">
import { GetAddressApi, UpdateAddressStatusApi } from '@/composables/address'
const router = useRouter()
const list = ref()
const chosenAddressId = ref()

const { data, status } = await GetAddressApi()

watch(
  status,
  () => {
    if (status.value === 'success') {
      list.value = data.value.map((item: { isDefault: any; id: any; name: any; phone: any; detail: string }) => {
        if (item.isDefault) {
          chosenAddressId.value = item.id
        }
        return {
          id: item.id,
          name: item.name,
          tel: item.phone,
          address: '详细地址：' + item.detail,
          isDefault: item.isDefault
        }
      })
    }
  },
  { immediate: true }
)

const onAdd = () => {
  router.push('/setting/addresscontent')
}

const onEdit = (item: { id: any }) => {
  router.push(`/setting/addresscontent?id=${item.id}`)
}

const handleSelect = async (event: { isDefault: boolean; id: number }) => {
  if (!event.isDefault) {
    const { data } = await UpdateAddressStatusApi(event.id, true)
    if (data.value.response === undefined) {
      list.value.forEach((item: { isDefault: boolean }) => {
        item.isDefault = false
      })
      event.isDefault = true
      showSuccessToast('切换地址成功')
    } else {
      showFailToast('切换地址失败')
    }
  }
}
</script>

<template>
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    default-tag-text="默认"
    @select="handleSelect"
    @add="onAdd"
    @edit="onEdit"
  />
</template>
