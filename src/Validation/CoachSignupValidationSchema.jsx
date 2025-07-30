import * as yup from 'yup'

const CoachSignupValidationSchema = yup.object().shape({
    name : yup.string().required("Name is required")
                       .min(3, "Name must have atmost 3 characters")
                       .max(50, "Name must have atmost 50 characters"),
    password : yup.string().required("Password Required")
                        .min(5, "Password must have atmost 5 characters")
                        .max(10, "Password must have atmost 10 characters"),
    dob : yup.date().required("Date Of Birth Required")
                    .min(new Date(new Date().getFullYear()-100,1,1), "Age must be atleast 100 years")
                    .max(new Date(new Date().getFullYear()-20,1,1), "Age must not be greater than 20 years"),
    gender : yup.string().required("Choose your Gender"),
    MobileNumber : yup.string().required("Mobile Number is Required")
                               .length(10,"Number should have 10 digits")
                               .matches('^[0-9]*$',"Number can only be digits"),
    speciality : yup.string().required("Speciality is required")
                             .min(10,"Alteast 10 characters")
                             .max(50, "Maximum lenght should be 50 characters")                       
});

export default CoachSignupValidationSchema;