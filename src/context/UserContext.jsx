const { createContext } = require("react");

export const UserContext=createContext(null)

export const UserContextProvider=({children})=>{
    const [userInfo, setUserInfo] = useState({
      firstName: "",
      lastName:"",
      email: "",
      isDoctor:"",
      imageUrl: "",
    });

    return(
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}