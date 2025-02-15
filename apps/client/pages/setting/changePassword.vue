<script setup lang="ts">
import ChangePasswordImg from '@/assets/images/change-password.png'
import { routerKey } from 'vue-router'
import { ChangePasswordApi } from '~/composables/auth'
const oldPassword = ref<string>('')
const newPassword = ref<string>('')
const confirmPassword = ref<string>('')

function asyncValidator(): boolean {
  if (!newPassword.value || !confirmPassword.value) return true
  if (newPassword.value === confirmPassword.value) return true
  return false
}

async function onSubmit() {
  if (newPassword.value.length < 6) {
    return showFailToast('密码长度不能小于6位')
  }

  const { data } = await ChangePasswordApi(oldPassword.value, newPassword.value)
  if (data.value.response === undefined) {
    showSuccessToast('修改成功')
    localStorage.removeItem('token')
    navigateTo('/')
  } else {
    showFailToast(data.value.message)
  }
}
</script>

<template>
  <img :src="ChangePasswordImg" />
  <van-form
    @submit="onSubmit"
    class="mt-5"
  >
    <van-cell-group inset>
      <van-field
        v-model="oldPassword"
        type="password"
        name="旧密码"
        label="旧密码"
        placeholder="旧密码"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="newPassword"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        :rules="[
          { required: true, message: '请填写新密码' },
          { validator: asyncValidator, message: '新密码与确认密码不一致' }
        ]"
      />
      <van-field
        v-model="confirmPassword"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[
          { required: true, message: '请填写确认密码' },
          { validator: asyncValidator, message: '新密码与确认密码不一致' }
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
      >
        修改密码
      </van-button>
    </div>
  </van-form>
</template>
