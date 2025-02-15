export const LoginApi = (account: string, password: string) =>
  usePostRequest('/auth/login', { account, password, type: '学生' })

export const ChangePasswordApi = (oldPassword: string, newPassword: string) =>
  usePutRequest('/auth/password', { oldPassword, newPassword })

export const ShowPersonApi = () => useGetRequest('/auth', {}, Date.now().toString())
