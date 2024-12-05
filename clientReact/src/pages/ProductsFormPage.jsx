import {useForm} from "react-hook-form";
import {createProduct, deleteProduct, updateProduct, getProduct} from "../api/products.api"
import {useNavigate, useParams} from "react-router-dom"
import {useEffect} from "react"
import {toast} from "react-hot-toast"

export function ProductsFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue} = useForm();
    const navigate = useNavigate() //para redireccionar 
    const params = useParams()  // para tomar parametros de la url 

    const categorias = [
        {value: 1, label: "T Shirts"},
        {value: 2, label: "Shorts"},
        {value: 3, label: "Pants"},
        {value: 4, label: "Hoodies"},
        {value: 5, label: "Accesories"},
    ]

    // toma los datos del formulario con handleSubmit, este toma los datos de ...register
    const onSubmit = handleSubmit( async data => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("descripcion", data.descripcion);
        formData.append("precio", data.precio);
        formData.append("stock", data.stock);
        formData.append("categoria", data.categoria);
        if (data.imagen && data.imagen[0]) {
            formData.append("imagen", data.imagen[0]);  
        }
        
        // si la url tiene un id, entonces se actualiza con los datos 
        try {
            if (params.id){ 
                await updateProduct(params.id, formData)
                toast.success("Producto actualizado")
            }else{ //si la url no tiene id, se esta creando 
                await createProduct(formData)
                toast.success("Producto creado")
            }   
            navigate("/products") 
        } catch (error){
            toast.error("Hubo un error al guardar el producto.");
        }
    });
    
    //Trae los datos de cada producto cuando se ingresa en su url, o sea, si tiene id la url
    useEffect(() =>{
        async function loadProduct(){
            if (params.id){
                const res = await getProduct(params.id)
                setValue("title", res.data.title)
                setValue("descripcion", res.data.descripcion)
                setValue("precio", res.data.precio)
                setValue("stock", res.data.stock)
                setValue("categoria", res.data.categoria)
            }
        } 

        loadProduct()
    }, [])
    
    return (
        <section className="bg-white min-h-screen flex items-center justify-center py-8"> {/* Añadir pt-8 para un relleno superior */}
            <div className="bg-gray-50 shadow-md w-full max-w-xl p-8">
                <h1 className="text-2xl font-bold text-center text-black mb-6">Crear Producto</h1>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Titulo</label>
                        <input 
                            type="text" 
                            name="title"
                            placeholder="Title" 
                            className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            {...register("title", { required: true })}
                        />
                        {errors.title && <span>El título es requerido</span>}
                    </div>
                    
                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">Descripcion</label>
                        <textarea 
                            rows="3" 
                            name="description"
                            placeholder="Description" 
                            className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            {...register("descripcion", { required: true })}
                        />
                        {errors.descripcion && <span>La descripción es requerida</span>}
                    </div>

                    <div>
                        <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                        <select 
                            name="categoria"
                            className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            {...register("categoria", { required: true })}
                            defaultValue="" 
                        >
                            <option value="" disabled>Seleccione una categoría</option>
                            {categorias.map((categoria) =>
                                <option key={categoria.value} value={categoria.value}>
                                    {categoria.label}
                                </option>
                            )}
                        </select>        
                        {errors.categoria && <span>La categoría es requerida</span>}
                    </div>
                                
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                        <input 
                            name="price"
                            type="number" 
                            placeholder="Price" 
                            className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            {...register("precio", { required: true })}
                        />
                        {errors.precio && <span>El precio es requerido</span>}
                    </div>

                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                        <input 
                            name="stock"
                            type="number" 
                            placeholder="Stock" 
                            className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            {...register("stock", { required: true })}
                        />
                        {errors.stock && <span>El precio es requerido</span>}
                    </div>
                    
                    <div>
                        <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>        
                        <input 
                            name="imagen"
                            type="file" 
                            accept="image/*" 
                            className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            {...register("imagen" )}
                        />
                        {errors.imagen && <span>La imagen es requerida</span>}
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300">Save</button>
                </form>

                {
                params.id && <button className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 focus:ring-4 focus:ring-red-300" onClick={ async () => {
                    const accepted = window.confirm("¿Estás seguro?")
                    if (accepted){
                        try{
                            await deleteProduct(params.id)
                            toast.success("Producto eliminado")
                            navigate("/products")
                        }
                        catch(error){
                            console.error("Error al eliminar el producto", error)
                            toast.error("No se puede eliminar el producto, intentelo nuevamente")
                        }
                    }
                    }}>Delete</button>
                }
            </div>
        </section>
    );
}

