import { ProductsList } from "../components/ProductsList"
import { useParams } from "react-router-dom"

export function ProductsPage(){
    const {category} = useParams() //leer la categoria desde la url 

    const categoryMap = {
        tshirts: "T-Shirts",
        shorts: "Shorts",
        pants: "Pants",
        hoodies: "Hoodies",
        accesories: "Accesories",
    }

    const heading = category ? `Todos nuestros ${categoryMap[category]}` : "Todos nuestros productos"; 

    return (
        <div className="p-4">
            <h1 className="text-black font-bold text-2xl uppercase mb-6 text-center ">
                {heading}
            </h1>
            <ProductsList category={category} />
        </div>

    )
}
