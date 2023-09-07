import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
    const token = Cookies.get('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            Cookies.remove('access_token');
        }

        throw error;
    },
);

export default axiosClient;
