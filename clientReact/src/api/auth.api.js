import axios from "axios"

const authApi = axios.create({
    baseURL: "http://127.0.0.1:8000/products/api/auth/", 
}) 

export const login = (credentials) => {
    return authApi.post("", credentials)
}