import axios from "axios"

const apiClient = axios.create({
    baseURL:'http://localhost:8080',
})
apiClient.interceptors.request.use(
    config=>{
        
    }
)