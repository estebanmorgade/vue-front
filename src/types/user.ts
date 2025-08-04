export type User = {
    id: number
    name: string
    email: string
    role: 'superadmin' | 'admin' | 'user'
    password: string | null
}