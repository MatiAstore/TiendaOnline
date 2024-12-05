import { useNavigate } from "react-router-dom"
import React, {useContext} from "react"
import { CartContext } from "../context/CartContext"
import { FaCartPlus } from "react-icons/fa"; 

export function ProductCard({product}){
    const navigate = useNavigate()
    const {addToCart} = useContext(CartContext)
  
    return (
        <div className="flex justify-center items-center sm:my-4 md:my-6 lg:my-8">
            <div 
                onClick={() => {navigate("/products/edit/" + product.id)}} 
                className="bg-white shadow-md hover:scale-105 duration-300 w-full max-w-md sm:w-80"
            >
                <img 
                    className="h-auto sm:h-48 md:h-60 lg:h-80 w-full object-cover" 
                    src={product.imagen} 
                    alt={product.title} 
                />

                <div className="px-4 py-3">
                    <span className="text-gray-400 uppercase text-sm">New</span>
                    <p className="text-lg font-bold block truncate capitalize">{product.title}</p>

                    <div className="flex items-center mt-2">
                        <p className="text-lg font-semibold">${product.precio}</p>
                        <p className="text-sm text-gray-600 ml-2">Stock: {product.stock}</p>

                        <FaCartPlus
                            className="text-xl cursor-pointer ml-auto text-gray-800 hover:text-blue-700"
                            onClick={(e) => {
                                e.stopPropagation(); // Evita navegar al hacer clic en el icono
                                addToCart(product); // utiliza addToCart proporcionado por el contexto para añadir el producto
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}