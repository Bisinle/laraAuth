import axios from "axios";

export const axiosAuth = axios.create({
    baseURL: `${import.meta.env.VITE_API_AUTH_URL}`,
    withCredentials: true,
    withXSRFToken: true,
});

export const axiosApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: true,
    withXSRFToken: true,
});

// Common request interceptor for both instances
const addRequestInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(async (config) => {
        // Fetch CSRF cookie before non-GET requests
        if (config.method !== "get") {
            await axios.get(
                `${import.meta.env.VITE_API_AUTH_URL}/sanctum/csrf-cookie`
            );
        }
        return config;
    });
};

// Common response interceptor for both instances
const addResponseInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            const { response } = error;
            if (response && response.status === 419) {
                console.error("CSRF token mismatch");
                // You might want to handle this error, e.g., by refreshing the page or redirecting to login
            }
            throw error;
        }
    );
};

// Add interceptors to both instances
addRequestInterceptor(axiosAuth);
addRequestInterceptor(axiosApi);
addResponseInterceptor(axiosAuth);
addResponseInterceptor(axiosApi);

export default {
    auth: axiosAuth,
    api: axiosApi,
};
