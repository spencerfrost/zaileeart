import { useRuntimeConfig } from '#app'

export function useFullImageUrl() {
  const config = useRuntimeConfig()
  
  return (path: string) => {
    if (!path) return ''
    // Check if the path is already a full URL
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }
    
    // if process.env.NODE_ENV is 'production', add the 'public' prefix
    return `${config.public.strapiURL}${path}`
  }
}