import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

const BASE_URL_WS = 'ws://localhost:3000';

interface AuthStore {
    ischeackingAuth: boolean;
    authuser: null | {username:string, email:string,_id:string, createdAt:string, updatedAt:string}; 
    isSigningup: boolean;
    isSigningin: boolean;
    isLoggingOut: boolean;
    socket: WebSocket | null;
    onlineUsers: string[];
    cheackAuth : () => Promise<void>;
    signup: (data:signupDataProps) => Promise<void>;
    logout: () => Promise<void>;
    signin: (data:{email:string, password:string}) => Promise<void>;
    conSocket:()=> void;
    dConSocket:()=> void;
}

interface signupDataProps {
  username:string,
  email:string,
  password:string
}

export const useAuthStore = create<AuthStore>((set,get) => ({
  ischeackingAuth: true,
  authuser: null,
  isSigningin:false,
  isSigningup:false,
  isLoggingOut:false,
  socket: null,
  onlineUsers:[],
  cheackAuth : async () => {
    try{
        const response = await axiosInstance.get('/auth/check');
        const responseData = response.data;
        set({authuser: responseData.user});
        get().conSocket();
    }
    catch(err){
        set({authuser:null})
    }
    finally{
        set({ischeackingAuth:false});
    }
  },
  signup: async (data:signupDataProps) => {
    set({isSigningup:true});
    try{
      const response = await axiosInstance.post('/auth/signup', data);
      const responseData = response.data;
      const {username, email, _id, createdAt, updatedAt} = responseData;
      set({authuser: {username, email, _id, createdAt, updatedAt}});
      toast.success(responseData.message);
    }
    catch(err: unknown){
      console.log(err);
      const message = (err as any)?.response?.data?.message || (err as any)?.message || "Signup failed. Please try again.";
      toast.error(message);
    }
    finally{
      set({isSigningup:false});
    }
  },
  logout: async () => {
    set({isLoggingOut:true});
    try{
      await axiosInstance.post('/auth/logout');
      set({authuser:null});
      toast.success("Logged out successfully");
      get().dConSocket();
    }
    catch(err){
      console.log(err);
      toast.error("Logout failed. Please try again.");
  }
  finally{
    set({isLoggingOut:false});
  }
},
  signin: async (data: {email:string, password:string}) => {
    set({isSigningin:true});
    try{
      const response = await axiosInstance.post('/auth/signin', data);
      const responseData = response.data;
      const {responseUser} = responseData;
      set({authuser: responseUser});
      toast.success(responseData.message);
      get().conSocket();
    }
    catch(err: unknown){
      console.log(err);
      const message = (err as any)?.response?.data?.message || (err as any)?.message || "Signin failed. Please try again.";
      toast.error(message);
    }
    finally{
      set({isSigningin:false});
    }
  },

 conSocket: () => {
  const { authuser, socket } = get();
  if (authuser && !socket) {
    const ws = new WebSocket(`${BASE_URL_WS}?id=${authuser._id}`);
    
    ws.onerror = (err) => console.error("Socket error:", err);
    ws.onclose = () => set({ socket: null });
    ws.onopen = () => console.log('socket connected with url: ', ws.url);

    ws.onmessage = (e)=>{
      console.log('message is being recieved');
      const jsonData = JSON.parse(e.data);
      if(jsonData.type == 'info'){
        console.log(jsonData.onlineusers);
        set({onlineUsers:jsonData.onlineusers})
      }
    }
    
    set({ socket: ws });
  }
},
  dConSocket: () => {
  const { socket } = get();
    if (socket) {
    socket.close();
    set({ socket: null });
    console.log('user disconnected with socket: ',socket.url);
    }
}
}));
