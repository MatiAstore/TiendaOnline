import React, {useState, createContext} from "react";
import {toast} from "react-hot-toast"

export const CartContext = createContext()

//Proveedor 
export function CartProvider({children}){
    const [cartItems, setCartItems] = useState([]);

    // Agregar producto, con validacion de stock y cantidad
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existeProductIndex = prevItems.findIndex((item) => item.id === product.id); //Chequea si existe el product, si es asi devuelve su posicion en el arreglo, sino encuentra retorna -1 
     
            if (existeProductIndex !== -1) {
                const updateItems = [...prevItems]; // copia de cartIems actual
                const existingProduct = updateItems[existeProductIndex]; // accede al producto actual en cartItems

                if (existingProduct.quantity < product.stock) { //chequea si la cantidad del producto es menor a la cantidad de stock disponible del mismo 
                    updateItems[existeProductIndex] = { 
                        ...existingProduct, // descompone las propiedades del product 
                        quantity: existingProduct.quantity + 1, //incrementa la cantidad del producto 
                    };
                    return updateItems; //retorna carrito actualizado con la nueva cantidad del product 
                } else { 
                    toast.error("Stock maximo alcanzado") // mensaje de error se si alcanza limite stock  
                    return prevItems; // retorna carrito sin cambios 
                }
            } else {
                return [...prevItems, { ...product, quantity: 1 }]; // retorna un nuevo arreglo con los productos q estabn y un nuevo producto con cantidad 1
            }
        });
    };

    // Borrar producto del carrito
    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId) //filtra el carrito actual, si el id del item es distino del producto.id lo trae al arreglo, sino, no lo trae
        );
    };

    // Calcular total
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0); //total arranque en 0, q es el acumulador. Reduce retorna de un arreglo un unico valor 
    };

    
    // Decrementar cantidad de un producto, si la cantidad llega a cero lo elimina 
    const decrementQuantity = (productId) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) => //recorre cada producto del carrito para encontrar el producto especifico 
                item.id === productId 
                    ? { ...item, quantity: item.quantity - 1 } //si coincide, copia propiedades del producto y modifica su cantidad, disminuyendo
                    : item //si no es el producto buscado, lo devuelve igual 
            );
    
            return updatedItems.filter((item) => item.quantity > 0); //eliminamos los products con cantidad de 0 
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );

}