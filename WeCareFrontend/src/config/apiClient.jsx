import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", 
});


apiClient.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }

    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized. Redirecting to login...");
      console.log("Bad Request");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
