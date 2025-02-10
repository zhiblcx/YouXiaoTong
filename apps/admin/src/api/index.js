import request from './request'

// 登录
export const loginApi = data => request.post('/admin/login', data)

// 获取全部用户
export const showAllUserApi = () => request.get('/admin/showalluser')

// 删除指定用户
export const deleteUserApi = id => request.get(`/admin/delete?user_id=${id}`)

// 上传文章
export const uploadArticleApi = data => request.post('/admin/uploadarticle', data)

// 删除文章
export const deleteArticleApi = id => request.get(`/admin/deletearticle?id=${id}`)

// 修改文章
export const updateArticleApi = data => request.post('/admin/editarticle', data)

// 查看所有文章
export const showAllArticle = () => request.post('/users/acquirearticle')

// 查看指定文章
export const showPointArticle = id => request.get(`/users/article?id=${id}`)

// 查看指定活动
export const showPointActivity = id => request.get(`/users/activity?id=${id}`)

// 查看所有活动
export const showAllActivity = () => request.get('/users/acquireallactivity')

// 删除活动
export const deleteActivity = id => request.get(`/admin/deleteactivity?activity_id=${id}`)

// 上传活动
export const uploadActivity = data => request.post('/admin/uploadactivity', data)

// 获取全部帖子
export const showAllTrends = () => request.get('/users/acquirealltrends')

// 删除帖子
export const deleteTrends = id => request.get(`/admin/deletetrends?trends_id=${id}`)
