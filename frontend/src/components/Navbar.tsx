import { useAuthStore } from "@/store/useAuthstore"
import { LogOut, MessageSquare, Settings, UserPen } from "lucide-react"
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
  const {authuser,logout,isLoggingOut} = useAuthStore();
  const navigate = useNavigate();
  const handleLogOut = async function(){
    await logout();
  }
  return (
    <div className="w-full flex justify-center">
    <header className="bg-background/10 border border-foreground/20 lg:w-4xl w-sm md:w-xl  rounded-xl z-10  backdrop-blur-4xl fixed flex my-2 justify-between items-center px-2 py-5 md:px-7">     
    <div className="flex items-center gap-2">
      <div className="bg-foreground/60 text-background p-1 rounded-md">
      <MessageSquare className="size-5 opacity-80"/>
      </div>
      <Link to = "/" className="text-lg cursor-pointer">Synapse</Link>
    </div>
    <div className="">
      {authuser && <div className="text-sm gap-3 flex">
        <Button onClick={() => navigate('/profile')} variant="ghost"><UserPen /><span className="hidden sm:inline">Profile</span></Button>
        <Button variant="outline"><Settings /><span className="hidden sm:inline">Settings</span></Button>
        <Button variant={isLoggingOut ? "destructive": "default"} onClick={handleLogOut} size="sm"><LogOut /><span className="hidden sm:inline">Log Out</span></Button>
        </div>}
    </div>
    </header>
    </div>
  )
}
