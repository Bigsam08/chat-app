import axios from "axios";


export const authAxios = axios.create({
    withCredentials: true,
    baseURL : "http://localhost:5001/api/auth"
})