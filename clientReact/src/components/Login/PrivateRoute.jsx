import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function PrivateRoute({ children }) {
    const { auth } = useContext(AuthContext);
    console.log("Estado de auth en PrivateRoute:", auth);

    if (!auth.isAuthenticated) {
        return <Navigate to="/login/" />;
    }

    return children;
}

