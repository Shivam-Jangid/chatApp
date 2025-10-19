import { useAuthStore } from "../store/useAuthstore"


export default function ProfilePage() {
  const {ischeackingAuth} = useAuthStore();

  console.log(ischeackingAuth);
  return (
    <div>
        Profile Page      
    </div>
  )
}
