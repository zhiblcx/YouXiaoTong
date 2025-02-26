import { defineStore } from 'pinia'

export const useMoneyStore = defineStore('money', () => {
  const money = ref(0.0)

  function setMoney(cash: number) {
    money.value = cash
  }

  return { money, setMoney }
})
