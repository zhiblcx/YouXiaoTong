export const LoginApi = (account: string, password: string) =>
  usePostRequest('/auth/login', { account, password, type: '学生' })

export const ChangePasswordApi = (oldPassword: string, newPassword: string) =>
  usePutRequest('/auth/password', { oldPassword, newPassword })

export const ShowPersonApi = () => useGetRequest('/auth', {}, Date.now().toString())

export const rechargeApi = (money: number) => usePutRequest(`/student/recharge?money=${money}`, {})
export const rechargeWaterApi = (money: number) => usePutRequest(`/student/recharge/water?money=${money}`, {})
export const rechargeLightningApi = (money: number) => usePutRequest(`/student/recharge/lightning?money=${money}`, {})
export const showTransactionApi = () => useGetRequest('/student/transaction', {}, Date.now().toString())
export const showStudentOrderApi = () => useGetRequest('/student/order', {}, Date.now().toString())
