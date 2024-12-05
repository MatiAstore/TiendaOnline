import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartItem } from "../components/CartItem";
import {Link} from "react-router-dom"

export function CartContent() {
    const { cartItems, getTotalPrice } = useContext(CartContext);

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-black font-bold text-2xl uppercase mb-6 text-center">Tu carrito</h2>
    
            {cartItems.length === 0 ? (
                <p>Tu carrito esta vacio <Link to="/products" className="font-semibold text-gray-900">Presione aqui para comprar</Link></p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((product) => (
                        <CartItem key={product.id} product={product} />
                    ))}

                    <div className="flex justify-between font-bold text-xl mt-4">
                        <p>Total Price:</p>
                        <p>${getTotalPrice()}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
