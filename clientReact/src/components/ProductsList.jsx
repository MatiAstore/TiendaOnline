import {useEffect, useState} from "react"
import {getAllProducts} from "../api/products.api"
import {ProductCard} from "./ProductCard"

export function ProductsList({category}){
    const [products, setlist] = useState([])

    const categoryMap = {
        1: "tshirts",
        2: "shorts",
        3: "pants",
        4: "hoodies",
        5: "accesories",
    }

    useEffect(() => {
        async function loadProducts(){
            const res = await getAllProducts();

            const categoryNumber = Object.keys(categoryMap).find( //obtiene todas las claves del objeto, luego con find buscamos q la clave q coincida con el valor de category (el q se recibe por parametro)
                key => categoryMap[key] === category
            );

            const filteredProduct = category ? res.data.filter(product => product.categoria === parseInt(categoryNumber)) : res.data; 
            setlist(filteredProduct);
        }
        loadProducts()
    }, [category])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
                <ProductCard  key={product.id} product={product}/>
                ))}
        </div>
    )
}