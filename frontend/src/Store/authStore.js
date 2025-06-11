// global state management for authentication

import { create } from "zustand";
import { authAxios } from "../Api/auth.axios"; // auth api request
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";


export const authStore = create((set, get) => ({

    //check user auth
    checkingAuth: true,
    userAuth: null,
    checkAuth: async () => {
        try {
            const response = await authAxios.get("/check")
            if (response.status === 200) {
                set({ checkingAuth: false, userAuth: response.data.user })
                get().socketConnection()
            }
        } catch (error) {
            console.log("user not authenticated check store", error.message)
            set({ checkingAuth: false, userAuth: null })
        }
    },

    // login 
    logginIn: false,
    login: async (data) => {
        set({ logginIn: true })
        try {
            const response = await authAxios.post("/login", data);
            if (response.status === 200) {
                // Manually refresh auth state after login
                await authStore.getState().checkAuth();
                toast.success(`Welcome back ${response?.data?.user?.userName}`)
                get().socketConnection()
            }

        } catch (error) {
            set({ userAuth: null })
            if (!error.response)
                return toast.error("Server currently unavailable please try again later");
            console.log("error in the login store", error.message)
            return toast.error(error.response?.data?.message);
        } finally {
            set({ logginIn: false })
        }
    },

    // logOut 
    logout: async () => {
        try {
            const response = await authAxios.post("/logout")
            if (response.status === 200) {
                set({ userAuth: null, checkingAuth: false })
                toast.success(response.data?.message || "log out successful bye!");
                get().socketDisconnection()
                return;
            }
            // Handle unexpected response status
            toast.error("Unexpected response status during logout.");
        } catch (error) {
            if (error.response) {
                return toast.error(error.response?.data?.message || "Server error, log out")
            } else {
                return toast.error("An error occurred while logging out.");
            }
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

    // update profile picture
    isUpdatingProfilePic: false,
    updateProfilePic: async (data) => {
        set({ isUpdatingProfilePic: true, })
        try {
            const response = await authAxios.put('/update-profilePic', data)
            set((state) => ({
                userAuth: {
                    ...state.userAuth,
                    profilePic: response.data.profilePic
                },
            }));
            toast.success("Profile picture updated successfully")
        } catch (error) {
            if (!error.response) {
                console.log("error in update store", error.message)
                return toast.error("Server currently unreachable Profile failed to update")
            }
            return toast.error(error.response?.data?.message || "Unexpected error has occurred")
        } finally {
            set({ isUpdatingProfilePic: false, })
        }

    },

    // update status
    isUpdatingStatus: false,
    updateProfileStatus: async (status) => {
        set({ isUpdatingStatus: true })
        try {
            const response = await authAxios.put("update-status", { status });
            if (response.status === 200) {
                set((state) => ({
                    userAuth: {
                        ...state.userAuth,
                        status: response.data.updatedStatus
                    }
                }))
                toast.success("Status updated successfully")
            }

        } catch (error) {
            if (!error.response) {
                console.log("error in update store", error.message)
                return toast.error("Server currently unreachable Profile failed to update")
            }
            return toast.error(error.response?.data?.message || "Unexpected error has occurred")

        } finally {
            set({ isUpdatingStatus: false })
        }
    },

    // delete user permanently
    isDeleting: false,
    deleteUser: async () => {
        set({ isDeleting: true })
        try {
            await authAxios.delete("/delete-user");
            set({ userAuth: null })
            return toast.success("Account Deleted successfully");
        } catch (error) {
            if (!error.response) {
                return toast.error("Server currently down try again later")
            } else {
                return toast.error("Unexpected error has occurred try again later")
            }
        } finally {
            set({ isDeleting: false })
        }
    },

    // socket connection
    onlineUsers: [],
    socket: null,
    socketConnection: () => {
        const { userAuth, socket } = get();
        if (!userAuth || socket) return;

        const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true,
        });

        // connect to the backend socket with the key event listener join 
        newSocket.on('connect', () => {
            console.log('Connected to socket server');
            newSocket.emit('join', { userId: userAuth.id, userName: userAuth.userName });
        });

        // get all online users 
        newSocket.on("announce", ({ userNames }) => {
            set({ onlineUsers: userNames });
        });
        set({ socket: newSocket });
    },


    socketDisconnection: () => {
        const { socket } = get();
        if (socket) {
            socket.removeAllListeners();
            socket.disconnect();
            set({ socket: null, onlineUsers: [] });
        }
    },

}));