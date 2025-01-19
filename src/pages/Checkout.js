import React from "react";
import { useCart } from "../components/CartContext"; // Correct import
import "../styles.css";

function Checkout() {
  const { cart, calculateTotal, clearCart } = useCart();

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      {cart.length === 0 ? (
        <p className="checkout-empty">Your cart is empty!</p>
      ) : (
        <>
          <div className="checkout-items">
            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>
                <div className="checkout-item-details">
                  <h4 className="checkout-item-name">{item.name}</h4>
                  <p className="checkout-item-price">Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <h3>Total Amount</h3>
            <p className="checkout-total-amount">
              ${calculateTotal().toFixed(2)}
            </p>
          </div>
          <button
            className="checkout-button"
            onClick={() => {
              alert("Purchase confirmed!");
              clearCart();
            }}
          >
            Confirm Purchase
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
