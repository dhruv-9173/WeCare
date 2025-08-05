import { createContext, useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({children})=>
{   
    
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [token, setToken] = useState();
    const [user,setUser] = useState({
        "userid":"",
        "role":""
    });

    useEffect(
        ()=>{
            const storedToken = localStorage.getItem("token");
            if(storedToken)
                {
                    console.log(storedToken);   
                    setisAuthenticated(true);
                    setToken(storedToken);
                    setUser({"userid" : localStorage.getItem("userid"),
                        "role":localStorage.getItem("role")
                });
                  
                }
                
        }
        ,[]);

    const AddToken = (token)=>
    {
      setToken(token);  
    }
    const AddUser = (user)=>
    {
      setUser(user);  
    }
    const updateAuth = (flag)=>
    {
        setisAuthenticated(flag);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated,token, AddToken, updateAuth,user,AddUser}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;