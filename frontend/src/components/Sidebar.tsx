import { useChatStore } from "@/store/useChatstore";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import type { userType } from "@/store/useChatstore";
import { useAuthStore } from "@/store/useAuthstore";

export default function Sidebar() {
  const { getUsers, users,setSelectedUser,selectedUser, isUsersLoading } = useChatStore();
  const {onlineUsers} = useAuthStore();

  console.log(onlineUsers);


  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return (
      <div className="flex items-center flex-col gap-10 h-full w-20 lg:w-96 e py-10">
        {Array.from({length:9}).map((_,idx) => { return <div key={idx} className="flex gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        </div>
        })}
      </div>
    );
  }


  return <div className="h-full w-auto md:w-1/3 overflow-auto lg:w-96 border-r">
    <div className="flex flex-col">
      {users.map((user:userType) => {
        return <button onClick={() => {setSelectedUser(user)}} className={`flex hover:bg-foreground/20 rounded-xl px-3 transition-all border-y items-center gap-3 cursor-pointer ${selectedUser == user? "bg-foreground/30":"bg-background"} py-3`} key={user._id}>
          <div className="rounded-full bg-foreground/80 relative text-background/90 px-3 py-1 text-2xl">
            {user.username[0].toUpperCase()}
            {onlineUsers.includes(user._id) && <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-background rounded-full"></div>}
            </div>
          <div className="md:flex-1 hidden  md:flex md:items-start py-2">
            <div>{user.username}</div>
          </div>
        </button>
      })}
    </div>
  </div>;
}
