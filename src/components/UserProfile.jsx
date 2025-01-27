import { User, LogOut, Mail, DatabaseIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, getAuth } from "firebase/auth";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export function ProfileMenu() {
      const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const handleLogout=()=>{
        const auth=getAuth()
        signOut(auth)
        .then(()=>{
                setUserInfo({
                    firstName: "",
    lastName: "",
    email: "",
    isDoctor: "",
    imageUrl: "",
    isLogin: false
                })
          navigate("/");


        })
        .catch((error)=> console.log(error))
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <img
            src={userInfo.imageUrl}
            alt="Prfile Image"
            width={30}
            height={20}
            className="rounded-full cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DatabaseIcon className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{userInfo.firstName}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>{userInfo.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
