import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import { useState, useEffect } from "react";
import { auth } from "../firebase"; // Import Firebase Auth
import { useCart } from "../components/CartContext"; // Import Cart Context for cart data
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome Icons
import {
  faHome,
  faSignInAlt,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons

function Navbar() {
  const [userEmail, setUserEmail] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling menu
  const { cart } = useCart(); // Get cart data from context

  // Fetch Current User's Email
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const emailPrefix = user.email.split("@")[0]; // Get part before @
        setUserEmail(emailPrefix);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">E-Commerce Store</h1>
      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <div className={`navbar-links-container ${menuOpen ? "open" : ""}`}>
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Login/Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Cart{" "}
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faUser} /> Profile
            </NavLink>
          </li>
        </ul>
        {userEmail && (
          <div className="user-email">
            Logged in as: <strong>{userEmail}</strong>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
