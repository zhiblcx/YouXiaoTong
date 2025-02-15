export const GetAddressApi = () => useGetRequest('/address', {}, Date.now().toString())
export const GetAddressByIdApi = (id: number) => useGetRequest(`/address/${id}`)
export const AddAddressApi = (data: object) => usePostRequest('/address', data)
export const UpdateAddressApi = (id: number, data: object) => usePutRequest(`/address/${id}`, data)
export const DeleteAddressApi = (id: number) => useDeleteRequest(`/address/${id}`)
export const UpdateAddressStatusApi = (id: number, status: boolean) =>
  usePutRequest(`/address/status/${id}?status=${status}`, {})
