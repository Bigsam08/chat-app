import axios from "axios";


export const authAxios = axios.create({
    withCredentials: true,
    baseURL : import.meta.env.VITE_AUTH_API
})