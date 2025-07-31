import coach from '../assets/coach.png'
import user from '../assets/user.png'
import {Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
function Home()
{
    const imageStyle=
    {
        width : '200px',
        display:'flex',
        justifyContent:'center',
        alignItems : "center"
    }
    const ContainerStyle=
    {
        display :"flex",
        alignItems : "center",
        justifyContent : "center",
        flexWrap : "wrap"

    }
    const cardStyle=
    {
        display : "flex",
        
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center",
        padding : "50px",
        gap : "30px",
        border : "2px solid blue",
        borderRadius : "10px",
        margin:"80px"

    }
    const navigate = useNavigate();
    return (
        <>
        <center><h1 style={{marginTop:"150px"}}>We are the heart of appropriate care</h1></center>
        <div style={ContainerStyle}>
            <div style={cardStyle}>
                <img style={imageStyle} src={coach} alt="coach-img" />
                <Button  onClick={()=>{navigate('/coachlogin')}}>Login As Coach</Button>
                <Button  onClick={()=>{navigate('/coachsignup')}}>Join As Coach</Button>


            </div>
            <div style={cardStyle}>
                <img style={imageStyle} src={user} alt="user.img" />
                <Button onClick={()=>{navigate('/usersignup')}}>Login As User</Button>
                <Button onClick={()=>{navigate('/userlogin')}}>Join As User</Button>
            </div>
        </div>
        </>
    );
}
export default Home