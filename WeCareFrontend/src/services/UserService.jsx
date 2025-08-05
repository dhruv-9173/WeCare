import apiClient from "../config/apiClient";

export const loadAllCoaches = () =>
{
    return apiClient.get("/users/loadcoaches");
}

export const gettimeSlots = ( date , coachid) =>
{
    return apiClient.get(`/users/gettimeslots?date=${date}&coachid=${coachid}`);
}

export const fixappointment = (appointment) =>
{
    return apiClient.post("/users/fixappointment",appointment);
}

export const addcomment = (comment) =>
{
    return apiClient.put("/users/addcomment",comment);
}

export const putRating = (rating , coachid) =>
{
    return apiClient.put(`/users/putRating?rating=${rating}&coachid=${coachid}`);
}

export const getComments = () =>
{
    return apiClient.get("/users/getComments");
}