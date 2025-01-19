import React from "react";
import { useCart } from "../components/CartContext"; // Correct import path
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
    clearCart,
  } = useCart();

  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">Price: ${item.price}</p>
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          <button
    className="cart-button"
    onClick={() => navigate("/checkout")} // Navigate to checkout
>
    Go to Checkout
</button>
<button
    className="cart-button"
    onClick={clearCart} // Clear cart functionality
>
    Empty Cart
</button>

        </>
      )}
    </div>
  );
}

export default Cart;
