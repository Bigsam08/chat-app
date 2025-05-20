/**
 * Axios instance to fetch all users and messages
 */

import axios from "axios";

 const userAxios = axios.create({
    baseURL: import.meta.env.VITE_MESSAGE_API,
    withCredentials: true
});
export default userAxios;