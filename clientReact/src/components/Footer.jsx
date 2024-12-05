import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialFacebook } from "react-icons/ti";

export function Footer() {
    return (
        <footer className="bg-black text-white p-4 mt-auto">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex justify-between items-center">
                    <Link to="home/" className="flex items-center space-x-3">
                        <img src={logo} className="h-8" alt="Logo" />
                        <span className="text-xl font-semibold">Haze™</span>
                    </Link>
                    <ul className="flex space-x-4">
                        <li><Link to="/products" className="hover:underline">Productos</Link></li>
                        <li><Link to="/politicas" className="hover:underline">Políticas de Cambios</Link></li>
                        <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
                    </ul>
                </div>
                <div className="text-center mt-4">
                    <span className="text-sm">© 2024 Haze™. Todos los derechos reservados.</span>
                </div>
            </div>
        </footer>

    )
}