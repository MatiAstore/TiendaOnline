import { useState } from "react"
import { Link } from "react-router-dom"
import { IoIosArrowDown } from "react-icons/io";

export function NavLinks(){
    const [heading, setHeading] = useState("")


    const links = [
        {name: "Productos", submenu: true, 
        sublinks: [
            {
                Head: "All Produts", 
                sublink: [
                    {name: "All Products", link: "products/"},
                    {name: "T-shirt", link: "products/tshirts"},
                    {name: "Shorts", link: "products/shorts"},
                    {name: "Pants", link: "products/pants"},
                    {name: "Hoodies", link: "products/hoodies"},
                    {name: "Accesories", link: "products/accesories"},
                ]
            }
        ]},
        {name: "Contacto"},
        {name: "Politicas de Cambios"}
    ]

    return (
        <>
        {links.map((link) =>   
            <div>
                <div className="px-3 text-left md:cursor-pointer group">
                    <h1 className="py-7 flex justify-between items-center md:pr-0 pr-5" onClick={()=> heading !== link.name ? setHeading(link.name) : setHeading("") }>
                        {link.name} 
                        {/* Mostrar flecha solo si el enlace tiene submenu */}
                        {link.submenu && (
                            <span className="text-xl md:mt-1 md:ml-2 inline">
                                <IoIosArrowDown name={`${heading === link.name ? "chevbron-up" : "chevbron-down"}`}/>
                            </span>
                        )}
                    </h1>
                    {
                        link.submenu && (
                            <div>
                                <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                                    <div className="py-3">
                                        <div className="w-4 h-4 left-3 absolute mt-1 bg-black rotate-45 "></div>
                                    </div>
                                    <div className="bg-black p-3.5 ">
                                        {
                                            link.sublinks.map((mysublinks)=> (
                                                <div>
                                                    <h1 className="text-lg font-semibold">{mysublinks.Head}</h1>
                                                    {mysublinks.sublink.map(slink=> (
                                                        <li className="text-sm text-gray-600 my-2.5">
                                                            <Link to={slink.link} className="hover:text-blue-800"> {slink.name}</Link>
                                                        </li>
                                                    ))}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                {/* Mobile menu*/}
                <div className={`${heading === link.name ? `md:hidden` : `hidden` }`}>
                    {link.submenu && link.sublinks.map((mysublinks) => (
                        <div>
                            <h1 className="py-4 pl-7 font-semibold md:pr-0 pr-5">{mysublinks.Head}</h1>
                            {mysublinks.sublink.map((slink) => (
                                <li  className="py-3 pl-14 text-sm text-gray-600 my-2.5">
                                    <Link to={slink.link} className="hover:text-blue-800">{slink.name}</Link>
                                </li>
                            ))}
                        </div>
                    ))}
                </div>


            </div>
        )}
    

        </>
    )
}