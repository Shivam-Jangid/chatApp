import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface userType {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface chatStoreProps {
    messages: Array<{
        _id: string;
        sender: string;
        receiver: string;
        content: string;
        createdAt: string;
        updatedAt: string;  
    }>;
    users: Array<{
        _id: string;
        username: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    }>;
    selectedUser: null | {
        _id: string;
        username: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    };
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    getUsers: () => Promise<void>;
    getMessages?: (userId: string) => Promise<void>;
    setSelectedUser: (user: null | {
        _id: string;
        username: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    }) => void;
}

export const useChatStore = create<chatStoreProps>((set) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    getUsers : async () => {
        set({isUsersLoading:true});
        try{
            const response = await axiosInstance.get('/messages/users');
            console.log(response.data);
            set({users:response.data.users});
        }
        catch(error){
            console.log("Error fetching users:", error);
        }
        finally{
            set({isUsersLoading:false});
        }
    },
    getMessages: async (userId:string) => {
        set({isMessagesLoading:true});
        try{
            const response = await axiosInstance.get(`/messages/${userId}`);
            console.log(response.data);
            set({messages:response.data.allMessages});
        }
        catch(error){
            console.log("Error fetching messages:", error);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },
    setSelectedUser: (user:userType | null) =>{
        set({selectedUser:user});
    }

}));
