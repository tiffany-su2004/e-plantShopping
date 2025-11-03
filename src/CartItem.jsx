// src/CartItem.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // --- subtotal for each item ---
  const calculateItemTotal = (item) =>
    (parseFloat(item.cost) * item.quantity).toFixed(2);

  // --- grand total ---
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseFloat(item.cost) * item.quantity;
    });
    return total.toFixed(2);
  };

  // --- event handlers ---
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (name) => dispatch(removeItem(name));

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🌿</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Unit Price: ${item.cost}</div>
                  <div className="cart-item-total">
                    Subtotal: ${calculateItemTotal(item)}
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button"
                      onClick={() => handleDecrement(item)}
                    >
                      −
                    </button>
                    <span className="cart-item-quantity-value">
                      {item.quantity}
                    </span>
                    <button
                      className="cart-item-button"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="cart-item-delete"
                    onClick={() => handleRemove(item.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p className="total_cart_amount">
              Total Cost: ${calculateTotalAmount()}
            </p>
            <div className="cart-buttons">
              <button
                className="get-started-button1"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button
                className="get-started-button1"
                onClick={handleCheckoutShopping}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
