import * as yup from 'yup'
const UserRegisterValidationSchema = yup.object().shape({
    name : yup.string().required("Name is required")
                       .min(3, "Name must have atmost 3 characters")
                       .max(50, "Name must have atmost 50 characters"),
    password : yup.string().required("Password Required")
                        .min(5, "Password must have atmost 5 characters")
                        .max(10, "Password must have atmost 10 characters"),
    email: yup.string().required("Email is Required")
                       .matches('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$', "Please Enter Valid Email"),

    dob : yup.date().required("Date Of Birth Required")
                    .min(new Date(new Date().getFullYear()-100,1,1), "Age must be atleast 100 years")
                    .max(new Date(new Date().getFullYear()-20,1,1), "Age must not be greater than 20 years"),
    gender : yup.string().required("Choose your Gender"),
    
    mobilenumber : yup.string().required("Mobile Number is Required")
                               .length(10,"Number should have 10 digits")
                               .matches('^[0-9]*$',"Number can only be digits"),
    
                               
});
export default UserRegisterValidationSchema;
