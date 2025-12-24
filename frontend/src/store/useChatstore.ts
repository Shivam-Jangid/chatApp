import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthstore";

export interface userType {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}
type messageData =  {
    text:string;
}

interface chatStoreProps {
    messages: Array<{
        _id: string;
        senderId: string;
        receiverId: string;
        text: string;
        createdAt: string;
        updatedAt: string;
        date:string;
        time:string;
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
    getMessages: (userId: string) => Promise<void>;
    setSelectedUser: (user: null | {
        _id: string;
        username: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    }) => void;
    subscribing: () => void;
    unsubscribing: ()=> void;
    sendMessage: (text:messageData) => void;
}

export const useChatStore = create<chatStoreProps>((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    getUsers : async () => {
        set({isUsersLoading:true});
        try{
            const response = await axiosInstance.get('/messages/users');
            set({users:response.data.alllUsers});
        }
        catch(error){
            toast.error("Error fetching users");
            console.log(error);
        }
        finally{
            set({isUsersLoading:false});
        }
    },
    getMessages: async (userId:string) => {
        set({isMessagesLoading:true});
        try{
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({messages:response.data.allMessages});
        }
        catch(error){
            toast.error("Error fetching messages")
            console.log(error);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },
    setSelectedUser: (user:userType | null) =>{
        set({selectedUser:user});
    },


    sendMessage: async(textObj: messageData) => {
        const {selectedUser, messages} = get();
        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`,textObj);
            set({messages:[...messages,res.data]});
        }
        catch(err){
            toast.error("Error occured while sending the message, wait and send later");
            console.log(err);
        }
    },
    subscribing: function(){
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        if(socket){
            socket.onmessage = function(e){
                const jsonParsed = JSON.parse(e.data);
                if(jsonParsed.type == "message"){
                    const newMessage = jsonParsed.message;
                    set({messages: [...get().messages, newMessage]}) 
                }
            }
        }
    },
    unsubscribing: function(){
        // const socket = useAuthStore.getState().socket;
        // if(socket){

        // }
    }
}));
