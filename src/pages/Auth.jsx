import Signup from "@/components/Signup";
import Login from "@/components/Login";
import NavBar from "@/components/NavBar";
import { useState } from "react";
const Auth = () => {
  const [login,setLogin]=useState(false)
  return (
    <>
      <NavBar />
      {
        login? <Login authSwitcher={setLogin}/> : <Signup authSwitcher={setLogin}/>
      }
    </>
  );
};

export default Auth;
