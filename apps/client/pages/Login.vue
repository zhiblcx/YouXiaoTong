<script setup lang="ts">
import { ref } from 'vue'
import LoginImg from '@/assets/images/login.jpg'
import { LoginApi } from '~/composables/auth'

const account = ref('')
const password = ref('')
const router = useRouter()

async function onSubmit() {
  const { data } = await LoginApi(account.value, password.value)
  if (data.value.response === undefined) {
    localStorage.setItem('token', data.value.access_token)
    router.push('/')
    showSuccessToast('登录成功')
  } else {
    showFailToast(data.value.message)
  }
}
</script>

<template>
  <img :src="LoginImg" />
  <div class="flex flex-col items-center">
    <van-form
      @submit="onSubmit"
      class="absolute top-[350px] pt-4 bg-white w-screen rounded-t-3xl"
    >
      <div class="font-bold mb-4 text-center text-xl text-[--van-primary-blue-color]">账号登录</div>
      <van-cell-group inset>
        <van-field
          v-model="account"
          name="密码"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px; margin-top: 30px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
