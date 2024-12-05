import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import {CartContext} from "../../context/CartContext"
import logo from "../../assets/logo.png"
import { NavLinks } from "./NavLinks";
import { MdOutlineMenu } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";


export function NavBar() {
    const [open, setOpen] = useState(false)
    const {cartItems} = useContext(CartContext)


    return (
        <nav className="bg-black text-white">
            <div className="flex items-center font-medium justify-around">
                {/* Logo */}
                <div className="z-50 p-5 md:w-auto w-full flex justify-between">
                    <img src={logo} alt="Logo" className="md:cursor-pointer h-9" />
                    <div className="text-4xl md:hidden" onClick={() => setOpen(!open)}>
                        {open ? <FiX/> : <MdOutlineMenu /> }
                    </div>
                </div>

                {/* Navbar */}
                <ul className="md:flex hidden uppercase items-center gap-8">
                    <li>
                        <Link to="/" className="py-7 px-3 inline-block">Home</Link>
                    </li>
                    <NavLinks></NavLinks>
                </ul>

                {/* Icono del carrito */}
                <div className="relative md:block hidden">
                    <Link to="/cart" aria-label="Go to cart" className="text-white text-2xl px-6 py-2">
                        <FaShoppingCart />
                        {/* Mostrar cantidad de productos en el carrito */}
                        {cartItems.length > 0 && (
                            <span className="absolute top-2 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile nav */}
                <ul className={`md:hidden bg-black absolute w-full h-screen bottom-0 py-24 pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
                    <li>
                        <Link to="/" className="py-7 px-3 inline-block">Home</Link>
                    </li>
                    <NavLinks />
                    <div className="py-5">
                        <Link to="/cart" aria-label="Go to cart" className="text-white text-2xl px-6 py-2 relative">
                            <FaShoppingCart />
                            {cartItems.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </ul>
            </div>
        </nav>
    )
}
