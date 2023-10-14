import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import GunList from './Pages/GunList';
import AccessoriesPage from './Pages/AccessoriesPage';
import GunCarousel from './Components/GunCarousel';
import Services from './Pages/Services';
import AboutUs from './Pages/AboutUs';
import CartPage from './Pages/CartPage';
//import { CartProvider } from './Components/CartContext';
import { AccountProvider } from './Components/AccountContext';
import CreateLogin from './Pages/CreateLogin';
import ReviewCart from './Pages/ReviewCart';
import ContactUs from './Pages/ContactUs';
import FFLTransfers from './Pages/FFLTransfers';
import SubmittedSuccessfully from './Components/SubmittedSuccessfully';
import ApiTestPage from './Pages/ApiTestPage';
import PartsPage from './Pages/PartsPage';
import SellPage from './Pages/SellPage';
import ProfilePage from './Pages/ProfilePage';
import Orders from './Pages/Orders';
import GalleryPage from './Pages/GalleryPage';
import GuestCheckout from './Pages/GuestCheckout';
import MemberCheckout from './Pages/MemberCheckout';
import OwnersPortal from './Pages/OwnersPortal';
import HowItWorks from './Pages/HowItWorks';
import UpdatePassword from './Pages/UpdatePassword';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
  
function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

return (
  <React.StrictMode>
      <AccountProvider>
       {/* <CartProvider> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/GunList" element={<GunList />} />
              <Route path="/GunList/:id" element={<GunList />} />
              <Route path="/Accessories" element={<AccessoriesPage />} />
              <Route path="/GunCarousel" element={<GunCarousel />} />
              <Route path="/Services" element={<Services />} />
              <Route path="/Gallery" element={<GalleryPage />} />
              <Route path="/FFL Transfers" element={<FFLTransfers />} />
              <Route path="/Parts" element={<PartsPage />} />
              <Route path="/Sell" element={<SellPage />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Cart" element={<CartPage />} />
              <Route
                path="/CreateAccount"
                element={<CreateLogin onLogin={handleLogin} />}
              />
              <Route path='/Checkout' element={<ReviewCart />} />
              <Route path='/ContactUs' element={<ContactUs />} />
              <Route path='/HowItWorks' element={<HowItWorks />} />
              <Route path="/Submitted Successfully" element={<SubmittedSuccessfully />} />
              <Route path="/APItest" element={<ApiTestPage />} />
              <Route path="/Profile" element={<ProfilePage />} />
              <Route path="/OwnersPortal" element={<OwnersPortal />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path='/ForgotPassword' element={<ForgotPassword />} />
              <Route path='/ResetPassword' element={<ResetPassword />} />
              <Route path='/UpdatePassword' element={<UpdatePassword />} />
              <Route path="/GuestCheckout" element={<GuestCheckout />} />
              <Route path="/MemberCheckout" element={<MemberCheckout />} />
            </Routes>
          </BrowserRouter>
      {/*  </CartProvider> */}
      </AccountProvider>    
    </React.StrictMode>
  );
}

export default App;

