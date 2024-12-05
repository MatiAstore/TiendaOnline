import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export const Sidebar = () => {
    const {auth, logout} = useContext(AuthContext); 
    const [isMinimized, setIsMinimized] = useState(false);
    const navigate = useNavigate(); 

    // Si el usuario no está autenticado, no mostrar el sidebar
    if (!auth.isAuthenticated) return null;    

    return (
        <div  className={`fixed top-0 right-0 p-4 w-64 bg-black bg-opacity-75 text-white transition-all ${
            isMinimized ? "w-16" : "w-64"
          } h-auto max-h-[calc(100vh-4rem)] shadow-md`}>

            {/* Botón para minimizar y maximizar el sidebar */}
            <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="absolute top-2 left-2 text-white bg-black rounded-full p-2 hover:bg-gray-600 focus:outline-none"
            >
                {isMinimized ? ">" : "<"}
            </button>

            {!isMinimized && (
            <div>
                <h2 className="text-xl font-bold mb-4 text-center">Panel de Administración</h2>
                <ul>
                    <li>
                    <button
                        onClick={() => navigate("/products-create")}
                        className="block w-full py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded-md mb-2"
                    >
                        Agregar Producto
                    </button>
                    </li>
                    <li>
                    <button
                        onClick={() => navigate("/products")}
                        className="block w-full py-2 px-4 bg-green-700 hover:bg-green-600 rounded-md mb-2"
                    >
                        Ver Productos
                    </button>
                    </li>
                    <li>
                    <button
                        onClick={logout}
                        className="block w-full py-2 px-4 bg-red-700 hover:bg-red-600 rounded-md mb-2"
                    >
                        Cerrar Sesión
                    </button>
                    </li>
                </ul>
            </div>
        )}

        </div>
    );
};
