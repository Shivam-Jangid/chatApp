import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

type user = {
    _id:string,
    username:string,
    email:string
}

type allUsers = {
    _id:string,
    username:string,
    email:string,
    createdAt:string,
    updatedAt:string
}

type formData = {
    email:string,
    username:string,
    password:string
}

interface AuthState {
    authUser:null | user,
    isAuthChecking:boolean,
    isSigningUp:boolean,
    isLoggingIn:boolean,
    isUpdatingProfile:boolean,
    checkAuth: () => Promise<void>,
    signUp:({email, username, password}:formData) => Promise<void>,
    signout :() => void,
    signin:({email, password}:Omit<formData, 'username'>) => Promise<void>,
    onlineUsers: allUsers[]
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isAuthChecking: true,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers:[],

    checkAuth: async () =>{
        try {
            const res = await axiosInstance.get('/auth/check');
            console.log(res.data);
            set({authUser:res.data.user})
        } catch (error) {
            console.log("Error checking auth", error);
            set({authUser:null});
        }
        finally{
            set({isAuthChecking:false});
        }
    },
    signUp: async ({email, username, password}:formData)=> {
        set({isSigningUp:true});
        try{
            const res = await axiosInstance.post('/auth/signup', {email, username, password});
            console.log(res.data);
            set({authUser:res.data.user});
            toast.success("Account created successfully"); 
        }
        catch(err){ 
            // @ts-ignore
            toast.error(err.response?.data?.message || "Error signing up");
        }
        finally{
            set({isSigningUp:false});
        }
    },
    signout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser:null});
            toast.success("Signed out successfully");
        } catch (error) {
            // @ts-ignore
            toast.error(error.response?.data?.message || "Error signing out");
        }
    },
    signin: async ({email, password}:Omit<formData, 'username'>) => {
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post('/auth/signin', {email, password});
            set({authUser:res.data.user});
            toast.success("Signed in successfully");
        } catch (error) {
            // @ts-ignore
            toast.error(error.response?.data?.message || "Error signing in");
        }
        finally{
            set({isLoggingIn:false});
        }
    }
}))