<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { changePasswordApi } from '../api'

const formState = ref({ oldPassword: '', newPassword: '' })

async function handlerSubmit() {
  if (formState.value.oldPassword.trim() == '' || formState.value.newPassword.trim() == '') {
    message.error('请填写完整')
  } else {
    const data = await changePasswordApi({
      oldPassword: formState.value.oldPassword,
      newPassword: formState.value.newPassword
    })
    if (data.data.code == 200) {
      message.success(data.data.message)
      formState.value = { oldPassword: '', newPassword: '' }
    } else {
      message.error(data.data.message)
    }
  }
}
</script>

<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    style="margin-top: 80px"
  >
    <a-form-item
      label="旧密码"
      name="oldPassword"
    >
      <a-input-password
        v-model:value="formState.oldPassword"
        style="width: 300px"
      />
    </a-form-item>
    <a-form-item
      label="新密码"
      name="newPassword"
    >
      <a-input-password
        v-model:value="formState.newPassword"
        style="width: 300px"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button
        type="primary"
        html-type="submit"
        @click="handlerSubmit"
        >保存</a-button
      >
    </a-form-item>
  </a-form>
</template>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
