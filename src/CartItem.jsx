import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // ✅ Access the cart items from Redux state
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Calculate subtotal for each item
  const calculateItemTotal = (item) => {
    // ensure we parse number correctly
    const price = parseFloat(item.cost);
    return (price * item.quantity).toFixed(2);
  };

  // ✅ Calculate total for all items in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(item.cost);
      total += price * item.quantity;
    });
    return total.toFixed(2);
  };

  // ✅ Handle “Continue Shopping” button
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // ✅ (Optional) Placeholder for checkout
  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  // ✅ Increment quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({ name: item.name, quantity: item.quantity + 1 })
    );
  };

  // ✅ Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name)); // remove if it would go below 1
    }
  };

  // ✅ Remove an item completely
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {/* If no items */}
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🌿</p>
      ) : (
        <>
          {/* ✅ List of cart items */}
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.cost}</p>
                  <p>Subtotal: ${calculateItemTotal(item)}</p>

                  {/* Quantity controls */}
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Total summary */}
          <div className="cart-summary">
            <h3>Total Cost: ${calculateTotalAmount()}</h3>
            <div className="cart-buttons">
              <button
                className="continue-btn"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button
                className="checkout-btn"
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
