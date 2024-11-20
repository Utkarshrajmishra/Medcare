import Signup from "@/components/Signup";
import Login from "@/components/Login";
import NavBar from "@/components/NavBar";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const Auth = () => {
  const success = (message) => {
    toast.success(message);
  };

  const error = (message) => {
    toast.error(message);
  };

  const [login, setLogin] = useState(false);
  return (
    <>
      <NavBar />
      {login ? (
        <Login authSwitcher={setLogin} success={success} errorsToast={error} />
      ) : (
        <Signup authSwitcher={setLogin} success={success} errorToast={error} />
      )}
      <ToastContainer />
    </>
  );
};

export default Auth;
