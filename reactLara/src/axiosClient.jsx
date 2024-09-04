import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/spi`,
});

//^ interceptors -> special function that get executed before the requsts is sent or the response received
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.get("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        } else if (response.status === 404) {
            // show not found page
        }
        throw error;
    }
);

export default axiosClient;
