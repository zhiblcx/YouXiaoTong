import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNicknameStore = defineStore('nickname', () => {
  const nickname = ref('管理员')
  function updateName(newNickname) {
    nickname.value = newNickname
  }

  return { nickname, updateName }
})
