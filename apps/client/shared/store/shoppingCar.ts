import { defineStore } from 'pinia'

export const useShoppingCarStore = defineStore('shopping', () => {
  const shopping = ref([])
  const total = ref<number>(0)

  function setShopping(car: never[]) {
    shopping.value = car
  }

  function addShopping(data) {
    if (shopping.value.length === 0) {
      shopping.value = [[{ ...data, quantity: 1 }]]
    } else if (shopping.value.find((item) => item[0].businessId === data.businessId)) {
      const index = shopping.value.findIndex((item) => item[0].businessId === data.businessId)
      if (shopping.value[index].find((item) => item.id === data.id)) {
        const index2 = shopping.value[index].findIndex((item) => item.id === data.id)
        shopping.value[index][index2].quantity++
      } else {
        shopping.value[index].push({ ...data, quantity: 1 })
      }
    } else {
      shopping.value = [[{ ...data, quantity: 1 }], ...shopping.value]
    }
    total.value = Number(total.value) + Number(data.price * 100)
  }

  function deleteShopping(businessId, goodId) {
    const index = shopping.value.findIndex((item) => item[0].businessId == businessId)
    const goodIndex = shopping.value[index].findIndex((item) => item.id === goodId)
    total.value =
      total.value -
      Number(shopping.value[index][goodIndex].price) * Number(shopping.value[index][goodIndex].quantity) * 100
    shopping.value[index].splice(goodIndex, 1)
    if (shopping.value[index].length === 0) {
      shopping.value.splice(index, 1)
      showSuccessToast('删除菜品成功')
    }
  }

  function minusShopping(businessId, goodId) {
    const index = shopping.value.findIndex((item) => item[0].businessId == businessId)
    const goodIndex = shopping.value[index].findIndex((item) => item.id === goodId)
    if (shopping.value[index][goodIndex].quantity > 1) {
      shopping.value[index][goodIndex].quantity--
      total.value = Number(total.value) - Number(shopping.value[index][goodIndex].price) * 100
    }
  }

  function plusShopping(businessId, goodId) {
    const index = shopping.value.findIndex((item) => item[0].businessId == businessId)
    const goodIndex = shopping.value[index].findIndex((item) => item.id === goodId)
    if (shopping.value[index][goodIndex].quantity < 99) {
      shopping.value[index][goodIndex].quantity++
      total.value = Number(total.value) + Number(shopping.value[index][goodIndex].price) * 100
    }
  }

  return { shopping, total, setShopping, deleteShopping, addShopping, minusShopping, plusShopping }
})
