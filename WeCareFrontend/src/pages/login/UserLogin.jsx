import { useEffect } from 'react';
import {Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import user from "../../assets/user.png"
import useLogin from "../../hooks/useLogin"
import Loader from '../../components/loader';
import useLogout from '../../hooks/useLogout'
function UserLogin()
{
    const {login,errors,loader} = useLogin();
    const handleSubmit = (e)=>
    {
        
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const LoginRequest={
<<<<<<< HEAD
            "id":Number(data.get("userid")),
=======
            "userid":Number(data.get("userid")),
>>>>>>> main
            "password":data.get("password"),
            "role":"USER"
        };
        console.log(LoginRequest);
        
        login(LoginRequest);
        
    
    }
    const logout = useLogout();
    useEffect(
        ()=>{
            logout();
        },[]);
    return (

        <>
        <div className="container" style={
            {
                marginTop:"150px",
                border: "2px solid blue",
                padding: "80px",
                borderRadius : "10px",
                backgroundColor : "AppWorkspace",
                width: "500px"
            }
        }>
            <center>
                <img src={user} alt="Coach" width={100} />
                <h2>Login As User</h2>
            </center>

            <form onSubmit={handleSubmit} method='post' style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    gap : "20px"
                } 
            }>

                <div className='mb-3'>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="Coach Id" 
                        name='userid'
                        required
                        placeholder="Enter Coach Id"
                        />
                </div>

                <div className='mb-3'>
                        <input 
                            type="password" 
                            className='form-control'
                            name="password"
                            required
                            placeholder="Enter Password"
                        />
                </div>
                {errors}
                {!loader ? (<Button type='submit'>Login</Button>):<Loader/>}
            </form>
            
        </div>
        </>
    );
}
export default UserLogin;