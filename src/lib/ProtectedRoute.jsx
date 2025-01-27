import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.isLogin === false) {
      navigate("/auth", { replace: true });
    }
  }, [userInfo?.isLogin, navigate]);

  if (userInfo?.isLogin === undefined) {
    // Optional: Add a loading state if the login status is undetermined
    return <div>Loading...</div>;
  }

  return userInfo?.isLogin ? children : null;
};

export default ProtectedRoute;
