import { useRuntimeConfig } from '#app'

export function useFullImageUrl() {
  const config = useRuntimeConfig()
  
  return (path: string) => {
    if (!path) return ''
    // Check if the path is already a full URL
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }
    // Otherwise, prepend the Strapi URL
    return `${config.public.strapiURL}${path}`
  }
}