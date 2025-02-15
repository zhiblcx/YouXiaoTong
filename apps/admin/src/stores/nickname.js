import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNicknameStore = defineStore('nickname', () => {
  const nickname = ref('管理员')
  const userId = ref()
  function updateName(newNickname) {
    nickname.value = newNickname
  }
  function updateUserId(id) {
    userId.value = id
  }

  return { nickname, userId, updateName, updateUserId }
})
