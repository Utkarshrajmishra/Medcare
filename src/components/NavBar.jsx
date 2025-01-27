import { useContext } from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { PopoverDemo } from "./User";
import { useState } from "react";
import { ProfileMenu } from "./UserProfile";

const NavLinks = [
  {
    id: 1,
    links: "Home",
    path: "/",
  },
  {
    id: 2,
    links: "Prediction",
    path: "/sympton",
  },
  {
    id: 3,
    links: "Audio Analysis",
    path: "/audio-analysis",
  },
  {
    id: 4,
    links: "Booking List",
    path: "/data/table",
  },
  {
    id: 5,
    links: "Doctor List",
    path: "/doctors/list",
  },
];

const NavBar = () => {
  const navigate = useNavigate();
  const {userInfo}=useContext(UserContext)
  const [open, setOpen]=useState(false)
  console.log(userInfo.imageUrl)
  return (
    <>
      <nav className="py-5 shadow-sm ">
        <section className="flex items-center text-textColor justify-between  px-[10%]">
          <div>
            <img src={Logo} alt="wesbite logo" />
          </div>
          <ul className="flex items-center gap-[2.7rem] text-[0.96rem]">
            {NavLinks?.map((items, index) => (
              <li key={items.id} className="hover:text-primaryColor">
                <Link to={items.path}>{items.links}</Link>
              </li>
            ))}
          </ul>
          <div>
            {userInfo && userInfo.isLogin ? (              <ProfileMenu />
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="bg-primaryColor px-5 text-[0.9rem] text-white py-2 rounded-3xl"
              >
                Login
              </button>
            )}
          </div>
        </section>
      </nav>
      <PopoverDemo open={open} setOpen={setOpen}/>
    </>
  );
};

export default NavBar;
