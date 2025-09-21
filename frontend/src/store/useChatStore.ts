import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export type user = {
    _id: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
}

interface chatTMessageType {
    messages: string[],
    users: user[],
    selectedUser: user | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    getUsers: () => Promise<void>,
    getMessages: (userId:string) => Promise<void>,
    setSelectedUser:(user:user) => void,
}

export const useChatStore = create<chatTMessageType>((set) => ({
    messages: [],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,


    getUsers: async () => {
        set({isUsersLoading:true});
        try{
            const res = await axiosInstance.get('/messages/users');
            set({users:res.data.alllUsers});
        }
        catch(err){
            //@ts-ignore
            toast.error(err.response?.data?.message || err.message || 'Something went wrong');
        }
        finally{
            set({isUsersLoading:false});
        }
    },

    getMessages: async (userId:string) => {
        set({isMessagesLoading:true})
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data.messages});
        }
        catch(err){
            //@ts-ignore
            toast.error(err.response?.data?.message || err.message || 'Something went wrong');
        }
        finally{
            set({isMessagesLoading:false});
        }

    },
    setSelectedUser: (selectedUser:user) => {
        set({selectedUser:selectedUser})
    }

}));