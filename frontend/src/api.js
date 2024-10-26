import axios from "axios";
import { ACCESS_TOKEN } from "./constants";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL    // import anything specified inside .env file
})

// intercepter = intercept any request we send and automatically add correct headers [with axios]
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN); 
        if(token) { 
            config.headers.Authorization = `Bearer ${token}`;   // embed JWT Token (Use backticks for template string)
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

export default api; 