import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children}) => {
    const token = localStorage.getItem("authToken")

    if(!token){
        return <Navigate to="/login/" ></Navigate>
    }

    return children;
}