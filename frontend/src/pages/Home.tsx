import Chatselected from "@/components/Chatselected";
import NochatSelected from "@/components/nochatSelected";
import Sidebar from "@/components/Sidebar";
import { useChatStore } from "@/store/useChatstore";

export default function Home() {
  const { selectedUser } = useChatStore();
  return (
    <div className="pt-25 mx-10 h-screen">
      <div className=" text-card-foreground flex h-full">
        <Sidebar />
        {selectedUser?<Chatselected />:<NochatSelected />}
      </div>
    </div>
  );
}
