/**
 * Store to handle all users request and messages in chat
 */

import { create } from "zustand";
import userAxios from "../Api/user.axios"
import toast from "react-hot-toast";
import { authStore } from "./authStore";

export const messageStore = create((set, get) => ({
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
    setSelectedUser: (user) => set({ selectedUser: user }),

    // send messages 
    // use zustand get to get the message from user by destructing
    // selected to get the sender Id
    isSendingMessage: false,
    sendMessage: async (messageDetails) => {
        set({ isSendingMessage: true })
        const { selectedUser, chats } = get();
        try {
            const response = await userAxios.post(`/send-messages/${selectedUser._id}`, messageDetails);
            set({ chats: [...chats, response.data] })
        } catch (error) {
            console.log("error send msg store", error.message)
            return toast.error(error.response?.data?.message || "message not sent")
        } finally {
            set({ isSendingMessage: false })
        }
    },

    // get new messages live
    getLiveMessage: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        // get the socket state from the authStore
        const socket = authStore.getState().socket;
        socket.on("new-message", (newMessage) => {

            const isMsgFromSelectedUser = newMessage.senderId._id === selectedUser._id
            if (!isMsgFromSelectedUser) return;

            set((state) => ({
                chats: [...state.chats, newMessage]
            }));
        });
    },

    // turn off live message
    offlineMessages: () => {
        const socket = authStore.getState().socket;
        if (!socket) return;
        socket.off("new-message");
    },

    // filter for the search bar
    searchingUser: false,
    searchResult: [],
    searchSpecificUser: async (query) => {
        set({ searchingUser: true })
        try {
            const response = await userAxios.get("/search-user", { params: { query: query } })
            set({ searchResult: response.data, searchingUser: false, })
        } catch (error) {
            set({ searchResult: [] })
            console.log(error.message)
        } finally {
            set({ searchingUser: false })
        }

    },

}))
