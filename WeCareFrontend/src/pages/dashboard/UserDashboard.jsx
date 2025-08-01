import "bootstrap/dist/css/bootstrap.min.css";
import userImage from '../../assets/user.png'
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons";
import LoadCoaches from "../../components/LoadCoaches";
function UserDashboard()
{
    const {user} = useAuthContext();
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const StyleOptions = {
        padding:"50px",
        TextDecoder:"none"
    }
    return (
    <>

    <div 
    style={{
        marginTop:"120px",
    }}>
        
       <button onClick={handleShow} style={{border:"0",backgroundColor:"white",marginLeft:'20px',color:"blue"}}><h1 class="bi bi-caret-right-square"> </h1></button>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
            
          <Nav className="flex-column">

            <NavLink to="/updateprofile" >Update Profile</NavLink>
            <NavLink >History</NavLink>
            <NavLink >Subscriptions</NavLink>
            <NavLink >Settings</NavLink>
            
          </Nav>
        
        </Offcanvas.Body>
      </Offcanvas>
        <div  style={
            {
                width:"100%",
                height:"20rem",
                
            }
        }>
            
        <div  style={{
            position:"relative",
            left:"70%",
            width:"20rem", 
        }}>
        <input type="search" placeholder="Search" className="form-control" />
        </div>
        <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
}}>
    <img 
        src={userImage} 
        alt="user-img"  
        width={150} 
        style={{
            border: "2px solid blue",
            borderRadius: "50%",
            objectFit: "cover"
        }} 
    />
</div>

        <center><h1 style={{color:"blue",fontFamily:"cursive",fontWeight:"bold"}}>Welcome {user.name}</h1></center>
        </div>
        <hr />
        
    </div>
    <div style={{height:'100ch'}}>
        <LoadCoaches/>
    </div>
    </>
    );

}
export default UserDashboard;