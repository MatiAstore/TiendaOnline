import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsPage } from "./pages/ProductsPage";
import { ProductsFormPage } from "./pages/ProductsFormPage";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home";
import { Footer } from './components/Footer';
import { CartContent } from "./pages/CartContent";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Toaster } from "react-hot-toast";
import { Sidebar } from './components/Login/Sidebar';
import { PrivateRoute } from './components/Login/PrivateRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>  
      <CartProvider> 
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <NavBar />

            {/* Contenido principal */}
            <main className="flex-1">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/products/:category' element={<ProductsPage />} />

                <Route path='/products-create' 
                element={ 
                  <PrivateRoute>
                      <ProductsFormPage />
                  </PrivateRoute>
                  } 
                />

                <Route path='/products/edit/:id' element={
                  <PrivateRoute>
                    <ProductsFormPage />
                  </PrivateRoute>
                } 
                />

                <Route path='/cart/' element={<CartContent />} />
                <Route path='/login/' element={<Login />} />
              </Routes>
            </main>

            {/* Sidebar con las opciones */}
            <Sidebar />

            {/* Notificaciones */}
            <Toaster />

            {/* Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
