import apiClient from "../config/apiClient"

export const authenticate = (LoginRequest) =>
{
   return apiClient.post("/login",LoginRequest);
}

export const registerUser = (RegisterRequest)=>
{
   return  apiClient.post("/registerUser",RegisterRequest);
   
}

export const registerCoach = (RegisterRequest)=>{
   return apiClient.post("/registerCoach",RegisterRequest);
}

export const signout = ()=>{
   return apiClient.post("/signout");
}

export const healthCheck = ()=>{
   return apiClient.get("/users/healthcheck");
}

export const getProfile = () =>
{
    return apiClient.get("/getProfile");
}

export const getAppointments = () =>
{
    return apiClient.get("/getAppointments");
}

export const getComments = (coachid) =>
{
    return apiClient.get(`/getComments?coachid=${coachid}`);
}
