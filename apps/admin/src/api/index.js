import request from './request'

// 登录
export const loginApi = (data) => request.post('/auth/login', data)
export const changePasswordApi = (data) => request.put('/auth/password', data)
export const showPersonApi = () => request.get('/auth')
export const showSystemApi = () => request.get('/auth/system')

// 学生
export const addStudentApi = (data) => request.post('/student', data)
export const getStudentApi = () => request.get('/student')
export const updateStudentApi = (id, data) => request.put(`/student/${id}`, data)
export const deleteStudentApi = (id) => request.delete(`/student/${id}`)

// 商家
export const addBusinessApi = (data) => request.post('/business', data)
export const getBusinessApi = () => request.get('/business')
export const updateBusinessApi = (id, data) => request.put(`/business/${id}`, data)
export const deleteBusinessApi = (id) => request.delete(`/business/${id}`)
export const showBusinessOrderApi = () => request.get('/business/order')
export const showBusinessTransactionApi = () => request.get('/business/transaction')
export const showBusinessSystemAPi = (id) => request.get(`/business/system/${id}`)
export const updateBusinessStatusApi = (status) => request.put(`/business/status?status=${status}`)

// 文章
export const addArticleApi = (data) => request.post('/article', data)
export const getArticleApi = () => request.get('/article')
export const deleteArticleApi = (id) => request.delete(`/article/${id}`)
export const updateArticleApi = (id, data) => request.put(`/article/${id}`, data)
export const updateArticleStatusApi = (id, status) => request.put(`/article/status/${id}?status=${status}`)
export const showArticleByIdApi = (id) => request.get(`/article/${id}`)

// 菜单
export const addMenuApi = (data) => request.post('/menu', data)
export const getMenuApi = () => request.get('/business/menu')
export const updateMenuApi = (id, data) => request.put(`/menu/${id}`, data)
export const deleteMenuApi = (id) => request.delete(`/menu/${id}`)
export const updateMenuStatusApi = (id, status) => request.put(`/menu/status/${id}?status=${status}`)
export const showMenuByIdApi = (id) => request.get(`/menu/${id}`)
export const showBusinessMenuApi = (id) => request.get(`/menu/business/${id}`)

// 订单
export const updateOrderStatus = (id, status) => request.put(`/order/status/${id}?status=${status}`)

// 账单
export const showTransactionApi = (id) => request.get(`/transaction/${id}`)
