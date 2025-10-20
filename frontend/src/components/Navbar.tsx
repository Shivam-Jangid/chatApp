import { useAuthStore } from "@/store/useAuthstore"
import { LogOut, MessageSquare, Settings, UserPen } from "lucide-react"
import { Button } from "./ui/button";


export default function Navbar() {
  const {authuser,logout,isLoggingOut} = useAuthStore();
  const handleLogOut = async function(){
    await logout();
  }
  return (
    <header className="bg-background/60 fixed flex w-full justify-between items-center backdrop-blur-xl py-5 md:px-7">     
    <div className="flex items-center gap-2">
      <div className="bg-foreground/60 text-background p-1 rounded-md">
      <MessageSquare className="size-5 opacity-80"/>
      </div>
      <span className="text-lg">Synapse</span>
    </div>
    <div className="">
      {authuser && <div className="text-sm gap-3 flex">
        <Button variant="ghost"><UserPen /><span className="hidden sm:inline">Profile</span></Button>
        <Button variant="outline"><Settings /><span className="hidden sm:inline">Settings</span></Button>
        <Button variant={isLoggingOut ? "destructive": "default"} onClick={handleLogOut} size="sm"><LogOut /><span className="hidden sm:inline">Log Out</span></Button>
        </div>}
    </div>
    </header>
  )
}
