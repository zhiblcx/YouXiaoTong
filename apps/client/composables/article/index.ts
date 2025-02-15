export const getArticle = () => useGetRequest('/article', {}, Date.now().toString())
export const getArticleById = (id: number) => useGetRequest(`/article/${id}`, {}, Date.now().toString())
