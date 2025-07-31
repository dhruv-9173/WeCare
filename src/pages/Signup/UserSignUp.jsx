import {useFormik} from 'formik'
import user from "../../assets/user.png"
import {Country,State,City} from 'country-state-city'
import { useState,useEffect } from 'react';
import {Button} from 'react-bootstrap'
import UserRegisterValidationSchema from "../../Validation/UserRegisterValidationSchema"
import useLogout from '../../hooks/useLogout';
function UserSignUp()
{
    const logout = useLogout();
    useEffect(
        ()=>{
            logout();
        },[]);
    const formik = useFormik({
        initialValues: {
            name : "",
            password : "",
            email : "",
            mobileNumber : "",
            gender : "",
            dob : "",
            pincode : "",
            city : "",
            state : "DL",
            country : "IN",
        },
        validationSchema:UserRegisterValidationSchema,
        onSubmit:values=>{
            console.log(values);
        },
    });
    const countries = Country.getAllCountries();
    const [states, setStates]=useState(State.getStatesOfCountry(formik.values.country));
    const [cities , setCities]=useState(City.getCitiesOfCountry(formik.values.country));
    
    useEffect(()=>{
        console.log("useEffect1");
        setCities(City.getCitiesOfCountry(formik.values.country));
        setStates(State.getStatesOfCountry(formik.values.country))
    },[formik.values.country]);
    {formik.touched && formik.errors}
    useEffect(()=>{
        setCities(City.getCitiesOfState(formik.values.country,formik.values.state));
    },[formik.values.state]);
    
    
    return(
        <>
            <div className='container' style={{
                marginTop:"5rem",
                marginBottom:"5rem",
                border:"2px solid blue",
                borderRadius:"10px",
                padding:"80px"
            }}>
                <center><h1><img src={user} alt="user-img" width={100}/> User SignUp</h1></center>
                <form id='myform' onSubmit={formik.handleSubmit} className='container' style={{
                    display:"flex",
                    gap : "50px",
                    marginTop:"50px",
                    marginBottom:"50px",


                }}>
                    <div className='col-md-6'>
                    <div className="form-group">
                        <label htmlFor="name" className='form-label'>Name:</label>
                        {formik.touched.name && formik.errors.name ? (<div className="text-danger fst-italic"> {formik.errors.name}</div>) : null}
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder='Enter Name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control" />
                    </div>
                   
                    <div className='form-group'>

                            <label htmlFor="email" className='form-label'>Email</label>
                            {formik.touched.email && formik.errors.email ? (<div className="text-danger fst-italic"> {formik.errors.email}</div>) : null}
                            <input
                                type="email"
                                className='form-control'
                                id="email"
                                name="email"
                                placeholder='Enter Email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                                />
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor="mobileNumber" className='form-label'>Mobile Number</label>
                        {formik.touched.mobileNumber && formik.errors.mobileNumber ? (<div className="text-danger fst-italic"> {formik.errors.mobileNumber}</div>) : null}
                        <input 
                            type='text'
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder='Enter Mobile Number'
                            value={formik.values.mobileNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='form-control'
                            />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="dob" className='form-label'>Date Of Birth</label>
                        {formik.touched.dob && formik.errors.dob ? (<div className="text-danger fst-italic"> {formik.errors.dob}</div>) : null}
                        <input 
                            type="date"
                            id="dob"
                            name="dob"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='form-control'
                        />
                    </div>

                    <div className='form-group'>
                            <label htmlFor="pinCode">PinCode</label>
                            {formik.touched.name && formik.errors.name ? (<div className="text-danger fst-italic"> {formik.errors.name}</div>) : null}
                            <input
                                type='text'
                                id="PinCode"
                                name="PinCode"
                                placeholder='Enter PinCode'
                                value={formik.values.pincode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='form-control'
                                />
                    </div>

                    
                    </div>
                    <div className='col-md-6'>
                            
                        <div className='form-group'>
                            <label htmlFor="password" className='form-label'>Password:</label>
                            {formik.touched.password && formik.errors.password ? (<div className="text-danger fst-italic"> {formik.errors.password}</div>) : null}
                            <input 
                                type="password" 
                                className='form-control'
                                id="password"
                                name="password"
                                placeholder='Enter Password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} 
                                />
                        </div>

                        

                        <div className='form-group'>
                            <label htmlFor="gender" className='form-label'>Gender</label> <br />
                            {formik.touched.gender && formik.errors.gender ? (<div className="text-danger fst-italic"> {formik.errors.gender}</div>) : null}
                            <input 
                                type="radio" 
                                value={"Male"}  
                                name="gender"
                                checked={formik.values.gender === "Male"}
                                onChange={formik.handleChange}
                                className='form-check-input'
                                /> Male 
                            <input 
                                type="radio" 
                                value={"Female"}
                                name="gender"
                                checked={formik.values.gender === "Female"}
                                onChange={formik.handleChange}
                                className='form-check-input'
                                /> Female
                        </div>

                        <div className='form-group'>
                        <label htmlFor="country" className='form-label'>Country</label>
                        <select 
                            name="country" 
                            id="country" 
                            className='form-select'
                            onChange={formik.handleChange}
                            value={formik.values.country}
                            >
                           {countries.map((country,index)=>{
                            return(
                           <option key={index} value={country.isoCode}>{country.name}</option>
                            );
                            })}
                        </select>
                        </div>
                        
                        <div className='form-group'>
                        <label htmlFor="state" className='form-label'>State/UT</label>
                        <select 
                            name="state" 
                            id="state" 
                            className='form-select'
                            onChange={formik.handleChange}
                            value={formik.values.state}
                            >
                            {
                                states.map(
                                    (state,index)=>{
                                        return(
                                        <option key={index} value={state.isoCode}>{state.name}</option>
                                        );
                                    }
                                )
                            }
                        </select>
                        </div>

                        <div className='form-group'>
                        <label htmlFor="city" className='form-label'>City</label>
                        <select 
                            name="city" 
                            id="city" 
                            className='form-select'
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            >
                            {
                                cities.map(
                                    (city,index)=>{
                                        return(
                                            <option key={index} value={city.name}>{city.name}</option>
                                        );
                                    }
                                )
                            }
                        </select>
                        </div>       
                    </div>
                    
                </form>
               <center><Button className='container' form="myform" type='submit'>Register</Button></center>

            </div>
        </>
    );
}
export default UserSignUp;