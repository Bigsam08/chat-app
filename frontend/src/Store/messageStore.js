/**
 * Store to handle all users request and messages in chat
 */

import { create } from "zustand";
import userAxios from "../Api/user.axios"
// import { toast } from "react-hot-toast";

export const messageStore = create((set) => ({
    selectedUser: null,

    // fetch all users
    allusers: [], // initial state is empty
    isFetchingUsers: false, // loading state
    userFetchError: null,
    getAllUsers: async () => {
        set({ isFetchingUsers: true })
        try {
            const response = await userAxios.get("/all-users");
            set({ allusers: response.data })
        } catch (error) {
            console.log("error in get users store", error.message)
            set({ userFetchError: error.response?.data?.message || "Server unavailable, try again later", allusers: [] })

        } finally {
            set({ isFetchingUsers: false })
        }
    },

    // fetch all chats
    chats: [], // array to store messages
    isFetchingChats: false, // loading state while fetching chats
    getChats: async (userId) => {
        set({ isFetchingChats: true })
        try {
            const response = await userAxios.get(`/get-chats/${userId}`)
            set({ chats: response.data })
        } catch (error) {
            console.log("error in fetch chat store", error.message);
        } finally {
            set({ isFetchingChats: false })
        }
    },

    // function to set selected user
    setSelectedUser: (user) => set({ selectedUser: user })

}))