import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"


export default function() {
    const selectedUser = useChatStore((s) => s.selectedUser);
    const onlineUsers = useAuthStore((s) => s.onlineUsers);
  return (
    <div className="">
        ChatHeader
    </div>
  )
}
 