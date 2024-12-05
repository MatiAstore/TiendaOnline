import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
    // Inicializar el estado correctamente
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const {login: authLogin} = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials, //esto permite copiar las propiedades existantes, es util por ej si se modifica solo username y no password
            [e.target.name]: e.target.value, //obtenemos evento, luego el elemento HTML donde se realizo y luego su name y valor. 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(credentials); // envio de user a backend, devuelve el token si esta autenticado
            const token = response.data.token; // obtenemos token de la respuesta
            authLogin(token) // Guardamos el token en localStorage
            navigate("/"); // Redirigir después del login
        } catch (error) {
            setError("Credenciales incorrectas o problema con el servidor.");
        }
    };

    return (
        <section className="bg-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-50 shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-black text-center mb-6">
                    Iniciar Sesión
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Nombre de usuario
                        </label>
                        <input
                            onChange={handleChange}
                            value={credentials.username}
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Nombre"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Contraseña
                        </label>
                        <input
                            onChange={handleChange}
                            value={credentials.password}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                {error && (
                    <p className="text-red-500 text-sm mt-4 text-center">
                        {error}
                    </p>
                )}
            </div>
    </section>
);
};
