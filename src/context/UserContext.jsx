import { createContext, useState } from "react";

export const UserContext = createContext({
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    isDoctor: "",
    imageUrl: "",
    isLogin: false,
  },
  setUserInfo:()=>{}
});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isDoctor: "",
    imageUrl: "",
    isLogin: false
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
