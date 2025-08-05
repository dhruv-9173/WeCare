import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { authenticate } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
function useLogin()
{
    const [errors,setError] = useState("");
    const [loader,setLoader]=useState(false);
    const {updateAuth, AddToken, AddUser} = useAuthContext();
    const navigate = useNavigate();
    const login =(LoginRequest)=>{
        setLoader(true);
        try{
            authenticate(LoginRequest)
            .then((response) => {
                    console.log(response.data);
                    localStorage.setItem("token",response.data.token);
                    localStorage.setItem("role",response.data.role);
                    localStorage.setItem("userid",response.data.userid);
                    updateAuth(true);
                    AddUser({
                        "userid":response.data.userid,
                        "role":response.data.role
                    
                });
                AddToken(response.data.token);
                if(response.data.role === "USER")
                        navigate("/userdashboard");
                else if(response.data.role === "COACH")
                        navigate("/coachdashboard");
                    
            })
            .catch((error)=>{
                setError("Invalid Credentials");
                
            })
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