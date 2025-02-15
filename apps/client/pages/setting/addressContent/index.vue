<script setup lang="ts">
import {
  AddAddressApi,
  DeleteAddressApi,
  GetAddressByIdApi,
  UpdateAddressApi,
  UpdateAddressStatusApi
} from '@/composables/address'
const route = useRoute()
const router = useRouter()
const initAddress = ref({})

const { data, status } = await GetAddressByIdApi(Number(route.query.id))

watch(
  status,
  () => {
    if (status.value === 'success') {
      initAddress.value = {
        id: data.value.id,
        name: data.value.name,
        tel: data.value.phone,
        addressDetail: data.value.detail,
        isDefault: data.value.isDefault
      }
    }
  },
  { immediate: true }
)

async function onSave(event: { name: any; tel: any; addressDetail: any; isDefault: any }) {
  if (route.query.id === undefined) {
    const { data } = await AddAddressApi({
      name: event.name,
      phone: event.tel,
      detail: event.addressDetail,
      isDefault: event.isDefault
    })
    if (data.value.response === undefined) {
      showSuccessToast('添加成功')
    } else {
      showFailToast('添加失败')
    }
    router.back()
  } else {
    const { data } = await UpdateAddressApi(Number(route.query.id), {
      name: event.name,
      phone: event.tel,
      detail: event.addressDetail,
      isDefault: event.isDefault
    })
    if (data.value.response === undefined) {
      showSuccessToast('修改成功')
    } else {
      showFailToast('修改失败')
    }
    router.back()
  }
}

async function onDelete() {
  const { data } = await DeleteAddressApi(Number(route.query.id))
  if (data.value.response === undefined) {
    showSuccessToast('删除成功')
  } else {
    showFailToast('删除失败')
  }
  router.back()
}

async function changeDefault(event: boolean) {
  if (route.query.id !== undefined) {
    await UpdateAddressStatusApi(Number(route.query.id), event)
  }
}
</script>

<template>
  <van-address-edit
    :address-info="initAddress"
    :show-area="false"
    :show-delete="route.query.id !== undefined"
    show-set-default
    @change-default="changeDefault"
    @save="onSave"
    @delete="onDelete"
  />
</template>
