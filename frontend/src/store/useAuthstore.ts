import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';

interface AuthStore {
    ischeackingAuth: boolean;
    authuser: null | {username:string, email:string}; 
    isSigningup: boolean;
    isSigningin: boolean;
    cheackAuth : () => Promise<void>;
    signup: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  ischeackingAuth: true,
  authuser: null,
  isSigningin:false,
  isSigningup:false,
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
  signup: async () => {
    set({isSigningup:true});
  }
}));