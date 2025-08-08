import apiClient from "../config/apiClient";



export const updateProfile =(updateProfile) =>
{
    return apiClient.put("/coach/updateProfile",updateProfile);
}



export const cancelAppointments =(appointment) =>
{
    return apiClient.put("/coach/cancelAppointments",appointment);
}

export const completeAppointments =(appointment) =>
{
    return apiClient.put("/coach/completeAppointment",appointment);
}

export const confirmAppointment = (appointment) =>
{
    return apiClient.put("/coach/confirmAppointment",appointment);
}

