import axios from "axios"

const apiClient = axios.create({
    baseURL:'http://localhost:8080',
})
apiClient.interceptors.request.use(
    config=>{
        const token = localStorage.getItem("user").token;
        if(token)
        {
            config.headers.Authorization(`Bearer ${token}`)
        }
    }, error => Promise.reject(error)
);

apiClient.interceptors.response.use(
    response=>response,
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;