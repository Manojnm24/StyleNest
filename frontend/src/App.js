import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";

// ✅ Newly added / fixed imports
import Orders from "./Pages/Orders";
import ResetPassword from "./Pages/ResetPassword";
import ProtectedRoute from "./Components/ProtectedRoute";
import ChatWidget from "./Components/ChatWidget/ChatWidget";

// ✅ Assets
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";

// ✅ Constants
export const backend_url = "http://localhost:4000";
export const currency = "₹";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Shop */}
        <Route path="/" element={<Shop gender="all" />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kid_banner} category="kid" />}
        />

        {/* Product */}
        <Route path="/product/:productId" element={<Product />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* 🔐 Protected Orders Route */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<LoginSignup />} />

        {/* 🔑 Reset Password */}
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
      </Routes>

      <Footer />

      {/* 💬 Chat Widget */}
      <ChatWidget />
    </Router>
  );
}

export default App;
