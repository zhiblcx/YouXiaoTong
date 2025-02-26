interface OrderType {
  addressId: number
  businessId: number
  note?: string
  order: Array<{ menuId: number; quantity: number }>
}

interface qrTransactionType {
  businessId: number
  money: number
  id: string
}

export const getBusinessApi = () => useGetRequest('/business', {}, Date.now().toString())
export const getMenuPublicByBusinessApi = (id: number) => useGetRequest(`/menu/public/${id}`)
export const getMenuById = (id: number) => useGetRequest(`/menu/${id}`, {}, Date.now().toString())
export const addOrderApi = (orderType: OrderType) => usePostRequest('/order', orderType)
export const qrTransactionAPI = (data: qrTransactionType) => usePostRequest('/transaction', data)
