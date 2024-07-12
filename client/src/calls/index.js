import axios from 'axios'
export const axiosInstance = axios.create({
    proxy:{
        host: 'localhost',
        port: 8080
    },
    headers:{
        'Content-Type':'application/json'
    }
})