import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export function CartItem({product}) {
    const { addToCart, decrementQuantity, removeFromCart } = useContext(CartContext);
    
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-500">
            <div className="flex items-center">
                {/* Imagen del producto */}
                <img
                    src={product.imagen}
                    alt={product.title}
                    className="w-20 h-20 object-cover mr-4"
                />

                {/* Nombre del producto */}
                <div>
                    <p className="font-bold text-lg">{product.title}</p>
                    <p className="text-gray-600 text-sm">Price: ${product.precio}</p>
                </div>
            </div>

            {/* Cantidad y botones para */}
            <div className="flex items-center gap-2">
                <button
                    onClick={()=> decrementQuantity(product.id) }
                    className="bg-gray-200 hover:bg-gray-600 p-2 rounded-full text-sm"
                > <FaMinus/></button>

                <span className="font-bold">{product.quantity}</span>

                <button
                    onClick={()=> addToCart(product) }
                    className="bg-gray-200 hover:bg-gray-600 p-2 rounded-full text-sm"
                ><FaPlus /></button>
            </div>

            {/* Precio total */}
            <div className="text-lg font-semibold">${product.precio * product.quantity}</div>

            {/* Botón de eliminar */}
            <button
                onClick={ () => removeFromCart(product.id)}
                className="text-black hover:text-red-500"
            >
                <FaTrashAlt />
            </button>
        </div>
    );
}