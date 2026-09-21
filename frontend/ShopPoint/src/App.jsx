import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/landingpage/Navbar";
import Hero from "./components/landingpage/Hero";
import CategorySection from "./components/landingpage/CategorySection";
import ShopSection from "./components/landingpage/ShopSection";
import HowItWorks from "./components/landingpage/HowItWorks";
import VendorCTA from "./components/landingpage/VendorCTA";
import Footer from "./components/landingpage/Footer";
import ProductPage from "./components/ProductPage/ProductPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import RiderRegister from './components/auth/RiderRegister';
import VendorRegister from './components/auth/VendorRegister';
import AllShops from "./components/AllShops/AllShops";
import DisplayShop from "./components/DisplayShop/DisplayShop";
import Billing from "./components/Biling/Billing";

// Landing Page
const LandingPage = () => {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />
        <CategorySection />
        <ShopSection />
        <HowItWorks />
        <VendorCTA />
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/rider/register" element={<RiderRegister />} />
        <Route path="/all-shops" element={<AllShops/>}/>
        <Route path="/shop/:id" element={<DisplayShop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
