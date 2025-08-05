import useAuthContext from "./useAuthContext";
import { signout } from "../services/AuthService";
function useLogout()
{
    const {updateAuth, isAuthenticated,AddToken, AddUser} = useAuthContext();
    const logout= ()=>{
        if(isAuthenticated)
        {
             signout()
             .then((response)=>
             {
                if(response.status === 204)
                {
                    updateAuth(false);
                    AddToken("");
                    AddUser({"userid":"","role":""});
                    localStorage.clear();
                    window.location.href=("http://localhost:5173/");
                }
             })
             .catch((error)=>
             {
                console.log(error);
             })
        }
    }
    return logout;
}
export default useLogout;