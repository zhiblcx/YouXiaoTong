/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFetchOptions } from 'nuxt/app'

export const useServerRequest = <T = any>(url: string, opts: UseFetchOptions<T> = {}) => {
  let token = ''
  if (process.client) {
    token = localStorage.getItem('token') || ''
  }

  const defaultOptions: UseFetchOptions<T> = {
    baseURL: '/api',
    onRequest({ options }) {
      if (token) {
        options.headers.set('Authorization', `Bearer ${token}`)
      }
    },
    onResponse({ response }) {
      console.log(response, 'response')
    }
  }

  const finalOptions = { ...defaultOptions, ...opts }
  return useFetch<T>(url, finalOptions as any)
}

export const usePostRequest = (url: string, data: object) =>
  useServerRequest(url, {
    method: 'POST',
    body: data
  })

export const usePutRequest = (url: string, data: object) =>
  useServerRequest(url, {
    method: 'PUT',
    body: data
  })

export const useDeleteRequest = (url: string, params?: object) =>
  useServerRequest(url, {
    method: 'DELETE',
    params
  })

export const useGetRequest = (url: string, params?: object, key?: string) =>
  useServerRequest(url, {
    method: 'GET',
    params,
    key
  })
