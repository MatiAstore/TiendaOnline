import axios from "axios"

const productsApi = axios.create({
    baseURL: "http://127.0.0.1:8000/products/api/products/"
})


// Agregar el token a los encabezados en cada solicitud
productsApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export const getAllProducts = () => {
    return productsApi.get("/")
}   

export const createProduct = (product) => {
    return productsApi.post("/", product)
}

export const deleteProduct = (id) => {
    return productsApi.delete(`/${id}/`)
}

export const updateProduct = (id, product) => {
    return productsApi.put(`/${id}/`, product)
}

export const getProduct = (id) => {
    return productsApi.get(`/${id}/`)
}
