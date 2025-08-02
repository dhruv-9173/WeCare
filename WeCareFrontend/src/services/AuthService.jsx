import apiClient from "../config/apiClient"

export const authenticate = (LoginRequest) =>
{
   return apiClient.post("/login",LoginRequest);
}