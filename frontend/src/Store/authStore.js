// global state management for authentication

import { create } from "zustand";
import { authAxios } from "../Api/auth.axios"; // auth api request
import { toast } from "react-hot-toast";


export const authStore = create((set) => ({
    //check user auth
    checkingAuth: true,
    userAuth: null,
    checkAuth: async () => {
        try {
            const response = await authAxios.get("/check")
            if (response.status === 200) {
                console.log("User Authenticated", response.data.user)
                set({ checkingAuth: false, userAuth: response.data.user })
            }
        } catch (error) {
            console.log("user not authenticated", error.message)
            set({ checkingAuth: false, userAuth: null })
        }
    },

    // login 
    loginSuccess: false,
    logginIn: false,
    login: async (data) => {
        set({ logginIn: true })
        try {
            const response = await authAxios.post("/login", data);
            if (response.status === 200) {
                toast.success(`Welcome back ${response?.data?.user?.userName} || Login Successful`)
                set({ logginIn: false, loginSuccess: true, userAuth: response.data.user })
            }

        } catch (error) {
            set({ logginIn: false, loginSuccess: false, userAuth: null })
            if (!error.response)
                return toast.error("Server currently unavailable please try again later");
            console.log("error in the login store", error.message)
            return toast.error(error.response?.data?.message);
        }
    },

    // registration
    registrationSuccess: false,
    isRegistering: false,
    register: async (data) => {
        set({ isRegistering: true })
        try {
            const response = await authAxios.post("/register", data);
            if (response.status == 201) {
                set({ registrationSuccess: true, isRegistering: false })
                toast.success(response.data?.message || "Account created successfully!😀")
            } // account has been added

        } catch (error) {
            set({ registrationSuccess: false, isRegistering: false })
            if (!error.response) {
                return toast.error("Server currently down, try again later");
            }
            console.log("Error in the register store", error.message)
            return toast.error(error.response?.data?.message || "Unexpected error! 😔");
        }
    },


}));