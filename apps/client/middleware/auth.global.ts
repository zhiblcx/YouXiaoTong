export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    if (!to.path.includes('login') && localStorage.getItem('token') === null) {
      return navigateTo('/login', { replace: true })
    }
  }
})
