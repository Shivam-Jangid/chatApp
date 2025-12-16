import SpotlightCard from "@/components/SpotlightCard";
import { useAuthStore } from "../store/useAuthstore"
import { Mail, User } from "lucide-react";


export default function ProfilePage() {
  const {authuser} = useAuthStore();
  let newDate;
  if(authuser?.createdAt){
    let createdDate = new Date(authuser.createdAt);
    newDate = createdDate.toDateString();
  }
  console.log(authuser)
  return (
    <div className="w-screen h-screen flex justify-center items-cemter">
       <SpotlightCard className="w-xl h-1/2 my-auto" spotlightColor="rgba(238, 240, 249, 0.2)">
       <div className="flex items-center mb-2 justify-center w-full gap-4">
        <div className="bg-foreground/40 rounded-full py-1 px-3">{authuser?.username[0].toUpperCase()}</div>
        <h1 className="mb-2 text-center text-2xl font-semibold opacity-80">Profile</h1>
        </div>
        <h2 className="text-center opacity-70 mb-7 text-sm">Your profile information</h2>
        <div className="flex flex-col gap-3">
          <span className="flex gap-2 items-center"><User className="size-4"/>Username</span>
          <div className="border text-sm border-foreground/50 rounded-md px-3 py-3">{authuser?.username}</div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <span className="flex gap-2 items-center"><Mail className="size-4"/>Email Address</span>
          <div className="border border-foreground/50 text-sm rounded-md p-3">{authuser?.email}</div>
        </div>
        <div className="mt-10 flex justify-between">
          <span className="text-sm">Member Since</span>
          <span className="text-sm">{newDate}</span>
        </div>
      </SpotlightCard>
    </div>
  )
}
