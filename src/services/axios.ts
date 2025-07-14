import axios from "axios";

const api = axios.create({
    baseURL: 'http://cursolaravel.test/api',
    withCredentials: true
})

export default api;