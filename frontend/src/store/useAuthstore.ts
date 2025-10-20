import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

interface AuthStore {
    ischeackingAuth: boolean;
    authuser: null | {username:string, email:string}; 
    isSigningup: boolean;
    isSigningin: boolean;
    isLoggingOut: boolean;
    cheackAuth : () => Promise<void>;
    signup: (data:signupDataProps) => Promise<void>;
    logout: () => Promise<void>;
    signin: (data:{email:string, password:string}) => Promise<void>;
}

interface signupDataProps {
  username:string,
  email:string,
  password:string 
}

export const useAuthStore = create<AuthStore>((set) => ({
  ischeackingAuth: true,
  authuser: null,
  isSigningin:false,
  isSigningup:false,
  isLoggingOut:false,
  cheackAuth : async () => {
    try{
        const response = await axiosInstance.get('/auth/check');
        const responseData = response.data;
        const {email, username, message} = responseData;
        console.log(message);
        set({authuser:{email, username}});
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
      set({authuser : {email: responseData.email, username: responseData.username}});
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
      set({authuser : {email: responseData.email, username: responseData.username}});
      toast.success(responseData.message);
    }
    catch(err: unknown){
      console.log(err);
      const message = (err as any)?.response?.data?.message || (err as any)?.message || "Signin failed. Please try again.";
      toast.error(message);
    }
    finally{
      set({isSigningin:false});
    }
  }
}));