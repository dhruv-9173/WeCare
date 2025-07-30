import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({children})=>
{
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [user, setUser] = useState([]);

    const AddUser = (user)=>
    {
      setUser(user);  
    }

    const updateAuth = (flag)=>
    {
        setisAuthenticated(flag);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, AddUser, updateAuth}}>
            {children}
            </AuthContext.Provider>
    );
}
export default AuthProvider;