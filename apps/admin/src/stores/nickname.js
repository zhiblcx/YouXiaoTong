import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNicknameStore = defineStore('nickname', () => {
  const nickname = ref()
  const userId = ref()
  const type = ref()
  function updateName(newNickname) {
    nickname.value = newNickname
  }
  function updateUserId(id) {
    userId.value = id
  }

  function updateType(value) {
    type.value = value
  }

  return { nickname, userId, type, updateName, updateUserId, updateType }
})
