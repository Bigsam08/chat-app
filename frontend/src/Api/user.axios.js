/**
 * Axios instance to fetch all users and messages
 */

import axios from "axios";

 const userAxios = axios.create({
    baseURL: "http://localhost:5001/api/",
    withCredentials: true
});
export default userAxios;