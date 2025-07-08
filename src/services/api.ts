import axios from "axios";
import type { User } from '../types/user'

// Instancia base

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

// Servicio para traer usuarios

export async function getUsers() {
    const response = await api.get('/users')
    return response.data
}

export async function createUser(user:User) {
    const response = await api.post('/users', user)
    return response.data
}