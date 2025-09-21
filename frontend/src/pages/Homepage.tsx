import Chats from "../components/Chats";
import Nochat from "../components/Nochat";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore"

export default function Homepage() {
  const selectdUser = useChatStore((s) => s.selectedUser);

  return (
    <div className="h-screen w-screen">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
        {selectdUser? <Chats /> :<Nochat /> }
        </div>
      </div>
    </div>
  )
}
