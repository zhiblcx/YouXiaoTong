<script setup lang="ts">
const route = useRoute()
if (route.query.id === undefined) {
  console.log('新增')
} else {
  console.log('修改')
}

function onSave() {
  showSuccessToast('保存成功')
}

function onDelete() {
  showSuccessToast('删除成功')
}

function changeDefault() {
  showSuccessToast('切换默认地址')
}
</script>

<template>
  <van-address-edit
    :show-area="false"
    show-delete
    show-set-default
    @change-default="changeDefault"
    @save="onSave"
    @delete="onDelete"
  />
</template>
