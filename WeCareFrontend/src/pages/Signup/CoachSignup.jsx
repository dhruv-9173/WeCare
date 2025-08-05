import { useState,useEffect } from 'react';
import useLogout from '../../hooks/useLogout';
import coach from '../../assets/coach.png'
import {useFormik} from 'formik'
import CoachSignupValidationSchema from '../../Validation/CoachSignupValidationSchema';
import {Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import {registerCoach} from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/confirmdialog';
import Loader from '../../components/loader';

function CoachSignup()
{
    const [loader, setLoader] = useState(false);
    const [confirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const [userid, setuserid] = useState(null);
    const [error , seterror] = useState("");
    const formik = useFormik(
        {
            initialValues:{
                name: '',
                password: '',
                dob: '',
                gender: '',
                mobilenumber: '',
                speciality: ''
            },
            validationSchema: CoachSignupValidationSchema,
            onSubmit: values=>{
                setLoader(true);
                registerCoach(values)
                .then((response) => {
                    setLoader(false);
                    setShowConfirm(true);
                    setuserid(response.data);
                    
                    })
                .catch(()=>{
                    setLoader(false);
                    seterror("Failed to register");
                })
                
            },
        }
    );

    
    return (
        <>
        {confirm && <ConfirmDialog 
                    show = {"Hello"+formik.values.name}
                    heading = {"Your UserId:" + userid}
                    message = {"Please remember this to login"}
                    onConfirm = {()=>{navigate("/coachlogin")}}
                    onCancel = {()=>{setShowConfirm(false)}}
                    />}
        <div className='container' style={
            {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent:"center",
                marginTop:"150px",
                border: "2px solid blue",
                padding: "30px 10px 40px 10px",
                width:"500px",
                borderRadius : "10px",
                backgroundColor : "AppWorkspace"
                
            }
        }>
            <center><img src={coach} alt="coach-icon" style={{width:"100px"}} />
            <h2>Life Coach Profile</h2></center>

            <form id='myform' onSubmit={formik.handleSubmit} style={{
                display:"flex",
                gap:"20px",
                alignItems:"center",
                justifyContent:"center"
            }}>
                
                <div >
                <div className="mb-3">
                <label className='form-label' htmlFor="name">Name</label> <br />
                {formik.touched.name && formik.errors.name ? (<div className="text-danger fst-italic"> {formik.errors.name}</div>) : null}
                <input 
                    type="text" 
                    id="name" 
                    className='form-control'
                    name="name" 
                    placeholder='Name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required /> 
                </div>
                <div className='mb-3'>
                <label className='form-label' htmlFor="dob">Date of Birth</label> <br />
                {formik.touched.dob && formik.errors.name?(<div className="text-danger fst-italic"> {formik.errors.dob}</div>) : null}
                <input 
                    type="date" 
                    className='form-control'
                    id='dob' 
                    placeholder='mm/dd/yyyy' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={(formik.values.dob)}
                    name='dob' 
                    required/>
                </div>
                <div className='mb-3'>
                <label className='form-label' htmlFor="MobileNumber">Mobile Number</label> <br />
                {formik.touched.MobileNumber && formik.errors.MobileNumber ? (<div className="text-danger fst-italic"> {formik.errors.MobileNumber}</div>) : null}
                <input 
                    type="text" 
                    className='form-control'
                    name='mobilenumber' 
                    placeholder='Mobile Number' 
                    value={formik.values.MobileNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required/> 
                </div>
                </div>
                <div>
                <div className='mb-3'>
                <label className='form-label' htmlFor="password">Password</label> <br />
                {formik.touched.password && formik.errors.password ? (<div className="text-danger fst-italic"> {formik.errors.password}</div>) : null}
                <input 
                    className='form-control'
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formik.values.password} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    placeholder='Password' 
                    required /> 
                </div>
                
                <div className='mb-3'>
                <label className='form-label' htmlFor="gender">Gender</label> <br />
                {formik.touched.gender && formik.errors.gender ? (<div className="text-danger fst-italic"> {formik.errors.gender}</div>) : null}
                <input 
                    
                    type="radio" 
                    value="Male"
                    name='gender' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    /> Male {" "}
                <input type="radio"
                    
                    value="Female"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='gender' /> Female
                </div>
                <div className='mb-3'>
                <label className='form-label' htmlFor="Speciality">Speciality</label> <br />
                {formik.touched.speciality && formik.errors.speciality ? (<div className="text-danger fst-italic"> {formik.errors.speciality}</div>) : null}
                <input 
                    className='form-control'
                    type="text" 
                    placeholder='Speciality' 
                    name='speciality' 
                    value={formik.values.speciality}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required/>
                </div>
                </div>
                
            </form>
            {<i style = {{color : "red"}}>{error}</i>}
            {!loader ? (<Button form="myform" type="submit">Register</Button> ): <Loader/>}
        </div>
        </>

    );
}
export default CoachSignup;