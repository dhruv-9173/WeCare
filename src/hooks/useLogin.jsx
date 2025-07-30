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
    const login = (LoginRequest)=>{
        setLoader(true);
        try{
            const user = authenticate(LoginRequest);
            if(user)
            {
                updateAuth(true);
                AddUser(user);
               navigate('/dashboard');
            }
            else {
                setError("Invalid CoachId or Password");
            }
        }
        catch(error)
        {
            
            console.log(error);
            setError("Error Logging in");
        }
        setLoader(false);
        
    }
    return {login , errors, loader};
}
export default useLogin;