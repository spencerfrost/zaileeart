import { useRuntimeConfig } from '#app'

export const useStrapi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.strapiURL

  const fetchAPI = async (endpoint, options = {}) => {
    const response = await fetch(`${baseURL}${endpoint}`, options)
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`)
    }
    return response.json()
  }

  return {
    async getEntries(contentType, params = {}) {
      const queryString = new URLSearchParams(params).toString()
      return fetchAPI(`/${contentType}?${queryString}`)
    },
    async getEntry(contentType, id) {
      return fetchAPI(`/${contentType}/${id}`)
    },
    async getSingleType(contentType) {
      return fetchAPI(`/${contentType}`)
    },
    async createEntry(contentType, data) {
      return fetchAPI(`/${contentType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    }
  }
}