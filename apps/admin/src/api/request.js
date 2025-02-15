import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  (error) => Promise.reject(error)
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401状态码表示未经授权，重定向到登录页面
      window.location.href = '/login'
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

export default instance
