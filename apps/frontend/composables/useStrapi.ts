import { useRuntimeConfig } from '#app'

export function useStrapi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.strapiURL

  const fetchAPI = async <T>(endpoint: string, options = {}) => {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const mergedOptions = {
      ...defaultOptions,
      ...options,
    }
    const url = `${baseURL}/api/${endpoint}`
    
    return useFetch<T>(url, {
      ...mergedOptions,
      transform: (response: any) => response.data
    })
  }

  return {
    find: <T>(contentType: string, params = {}) => fetchAPI<T>(contentType, { params }),
    findOne: <T>(contentType: string, id: string, params = {}) => fetchAPI<T>(`${contentType}/${id}`, { params }),
    create: <T>(contentType: string, data: any) => fetchAPI<T>(contentType, { method: 'POST', body: data }),
    update: <T>(contentType: string, id: string, data: any) => fetchAPI<T>(`${contentType}/${id}`, { method: 'PUT', body: data }),
    delete: <T>(contentType: string, id: string) => fetchAPI<T>(`${contentType}/${id}`, { method: 'DELETE' }),
  }
}