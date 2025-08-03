import apiClient from "../config/apiClient"

export const authenticate = (LoginRequest) =>
{
   return apiClient.post("/login",LoginRequest);
}

export const registerUser = (RegisterRequest)=>
{
   return apiClient.post("/registerUser",RegisterRequest);
}

export const registerCoach = (RegisterRequest)=>{
   return apiClient.post("/registerCoach",RegisterRequest);
}