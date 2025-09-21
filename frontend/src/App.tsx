import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function App(){
  const authUser = useAuthStore((state) => state.authUser);
  const checkAuth = useAuthStore((state) => state.checkAuth); 
  const ischeckingAuth = useAuthStore((state) => state.isAuthChecking); 
  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);
  console.log({authUser});
  if(ischeckingAuth && !authUser)
    return <div className="flex items-center justify-center h-screen">
      <Loader  className="size-10 animate-spin "></Loader>
    </div>


  return <div>
    <Navbar />
    <Routes>
      <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/signin" />}/>
      <Route path="/signup" element={!authUser?<SignupPage />:<Navigate to = "/" />}/>
      <Route path="/signin" element={!authUser?<SigninPage />:<Navigate to = "/" />}/>
      <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signin" /> }/>
      <Route path="/settings" element={<SettingsPage />}/>
    </Routes>  
    <Toaster />
  </div>
}