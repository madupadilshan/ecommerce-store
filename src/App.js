import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import { CartProvider } from "./components/CartContext"; // Correct path
import Checkout from "./pages/Checkout"; // Import the Checkout page
import Profile from "./pages/Profile"; // Import the Profile component
import LoginRegister from "./pages/LoginRegister"; // Import the LoginRegister component
import "./styles.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<LoginRegister />} />


          </Routes>
          <footer className="footer">
            <div className="footer-content">
              <p>© 2025 E-Commerce Store. All Rights Reserved.</p>
              <div className="footer-links">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
                <a href="/contact-us">Contact Us</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
