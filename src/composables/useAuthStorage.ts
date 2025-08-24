// composables/useAuth.ts
export function useAuthStorage() {
  const saveToken = (token: string) => localStorage.setItem('token', token)
  const clearToken = () => localStorage.removeItem('token')
  const getToken = () => localStorage.getItem('token')

  return { saveToken, clearToken, getToken }
}
