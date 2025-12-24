import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthstore";
import { formatDateTime } from "@/lib/utils";

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
    sendMessage: (text:messageData) => void;
    addIncomingMessage: (message: any) => void;
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


    sendMessage: async (textObj: messageData) => {
  const { selectedUser, messages } = get();
  const { authuser } = useAuthStore.getState();
  
  if (!selectedUser || !authuser) return;
  
  const tempId = `temp-${Date.now()}`;
  const tempMessage = {
    _id: tempId,
    senderId: authuser._id,
    receiverId: selectedUser._id,
    text: textObj.text,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    date: formatDateTime(new Date()).date,
    time: formatDateTime(new Date()).time,
    __isTemporary: true
  };

  set({ messages: [...messages, tempMessage] });

  try {
    const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, textObj);
    
    // Replace temp message with real one
    set(state => ({
      messages: state.messages.map(msg => 
        msg._id === tempId 
          ? { ...res.data.newMessage, __isTemporary: false }
          : msg
      )
    }));
  } catch (err) {
    set(state => ({
      messages: state.messages.filter(msg => msg._id !== tempId)
    }));
    toast.error("Failed to send message. Please try again.");
  }
},
    addIncomingMessage: (newMessage) => {
    const { messages, selectedUser } = get();
    const { authuser } = useAuthStore.getState();
    
    if (selectedUser && (
      (newMessage.senderId === authuser?._id && newMessage.receiverId === selectedUser._id) ||
      (newMessage.senderId === selectedUser._id && newMessage.receiverId === authuser?._id)
    )) {
      if (!messages.some(msg => msg._id === newMessage._id)) {
        set({ messages: [...messages, newMessage] });
      }
    }
  },
}));
