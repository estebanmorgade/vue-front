import axios from "axios";
import router from "../router";
import { useUserStore } from "../stores/useUserStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;

        switch (status) {
            case 401:
                const userStore = useUserStore()
                userStore.logout()
                router.push("/login")
                break;
            
            case 403:
                router.push('/unauthorized')
                break;
            
            case 404:
                router.push('/NotFound')
                break;

            case 500:
                alert('Server error, try again')
                break;
        }

        return Promise.reject(error);

    }
)

export default api;