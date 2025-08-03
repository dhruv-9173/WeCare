import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { authenticate } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
function useLogin()
{
    const [errors,setError] = useState("");
    const [loader,setLoader]=useState(false);
    const {updateAuth, AddUser} = useAuthContext();
    const navigate = useNavigate();
    const login =async (LoginRequest)=>{
        setLoader(true);
        try{
            const user =  await authenticate(LoginRequest);
            if(user)
            {
               console.log(user);
               updateAuth(true);
               AddUser(user);
               localStorage.setItem("user",JSON.stringify(user));
               navigate('/dashboard');
            }
            else {
                setError("Invalid CoachId or Password");
            }
            setLoader(false);
      
        }
        catch(error)
        {
            
            console.log(error);
            setError("Error Logging in");
            setLoader(false);
        }
        
        
    }
    return {login , errors, loader};
}
export default useLogin;