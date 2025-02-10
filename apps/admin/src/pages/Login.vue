<script setup>
import { message } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { loginApi } from '../api'
const account = ref('')
const password = ref('')
const showLoginForm = ref(true)
const errorMessage = ref('')
const router = useRouter()
const type = ref('商家')

watch(showLoginForm, () => {
  errorMessage.value = ''
})

async function login() {
  if (account.value == '') {
    return (errorMessage.value = '账号不能为空')
  }
  if (password.value == '') {
    return (errorMessage.value = '密码不能为空')
  }

  const data = await loginApi({ account: account.value, password: password.value })
  if (data.data.code == 200) {
    localStorage.setItem('token', data, data.data.token)
    errorMessage.value = ''
    router.push('/user')
    message.success('登录成功')
  } else {
    message.error(data.data.message)
  }
}
</script>

<template>
  <div style="background-image: url('src/assets/background.png')">
    <div class="login-container animate__animated animate__backInDown">
      <div
        class="login-form"
        style="background-color: hsla(0, 0%, 70%, 0.1)"
        v-if="showLoginForm"
      >
        <h2 style="color: white">登录</h2>
        <form>
          <label>账号</label>
          <input
            type="text"
            v-model.trim="account"
            style="outline: none"
          />
          <label>密码</label>
          <input
            type="password"
            v-model.trim="password"
            style="outline: none"
          />
          <a-radio-group
            v-model:value="type"
            style="margin-top: 20px; display: flex; justify-content: center; align-items: center"
          >
            <a-radio value="商家">商家</a-radio>
            <a-radio value="管理员">管理员</a-radio>
          </a-radio-group>
          <button
            type="submit"
            @click.prevent="login"
          >
            登录
          </button>
        </form>
        <p
          class="error-message"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form,
.register-form {
  width: 400px;
  padding: 30px;
  padding-bottom: 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-form h2 {
  margin-bottom: 20px;
}

.register-form h2 {
  margin-bottom: 10px;
}

.login-form label,
.register-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  text-align: left;
  color: #444;
}

.login-form input {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.register-form input {
  display: block;
  width: 100%;
  margin-bottom: 5px;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.login-form button {
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #fb86a7;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.register-form button {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background-color: #fb86a7;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.login-form button:hover,
.register-form button:hover {
  background-color: #fb86a7;
}

.error-message {
  margin-top: 20px;
  color: #f00;
}

.phone-verification button {
  background-color: #fb86a7;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 10px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button:disabled:hover {
  background-color: #fb86a7;
}
</style>
