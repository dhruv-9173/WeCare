import apiClient from "../config/apiClient";



export const updateProfile =async (updateProfile) =>
{
    return apiClient.put("/coach/updateProfile",updateProfile);
}



export const cancelAppointments =async (appointment) =>
{
    return apiClient.put("/coach/cancelAppointments",appointment);
}

export const completeAppointments =async (appointment) =>
{
    return apiClient.put("/coach/completeAppointment",appointment);
}

export const confirmAppointment =async (appointment) =>
{
    return apiClient.put("/coach/confirmAppointment",appointment);
}