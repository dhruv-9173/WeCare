import useAuthContext from "./useAuthContext";
function useLogout()
{
    const {updateAuth, isAuthenticated, AddUser} = useAuthContext();
    const logout= ()=>{
        if(isAuthenticated)
             updateAuth(false);
             AddUser(null);
    }
    return logout;
}
export default useLogout;