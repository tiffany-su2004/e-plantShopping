import React, { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalQuantity = () => {
    return cartItems
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  // ✅ Use public hosted image URLs so they show on GitHub Pages
  const plantsArray = [
    {
      category: "Aromatic Plants",
      plants: [
        {
          name: "Lavender",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/0/0c/Lavandula_angustifolia_%28French_Lavender%29.jpg",
          description: "Soothing fragrance and calming aroma.",
          cost: 12,
        },
        {
          name: "Rosemary",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/5/59/Rosmarinus_officinalis2.jpg",
          description: "Fragrant herb used for cooking and relaxation.",
          cost: 10,
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/f/f5/Aloe_vera_flower.JPG",
          description: "Healing plant for skin and overall wellness.",
          cost: 15,
        },
        {
          name: "Tulsi",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/3/3f/Ocimum_tenuiflorum2.jpg",
          description: "Known for its medicinal and spiritual value.",
          cost: 8,
        },
      ],
    },
    {
      category: "Decorative Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/f/fb/Sansevieria_trifasciata.jpg",
          description: "Air-purifying plant with tall upright leaves.",
          cost: 14,
        },
        {
          name: "Peace Lily",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/a/a0/Spathiphyllum_cochlearispathum_RTBG.jpg",
          description: "Elegant flowering plant ideal for indoor décor.",
          cost: 13,
        },
      ],
    },
  ];

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      {/* ✅ Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7652/7652494.png"
            alt="logo"
            className="logo"
          />
          <div className="brand">
            <h2>Paradise Nursery</h2>
            <p>Where Green Meets Serenity</p>
          </div>
        </div>
        <div className="navbar-right">
          <a href="#" onClick={handleHomeClick}>
            Home
          </a>
          <a href="#" onClick={handleCartClick}>
            🛒 Cart
            <span className="cart-count">{calculateTotalQuantity()}</span>
          </a>
        </div>
      </div>

      {/* ✅ Main Content */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="product-card">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="product-image"
                    />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className={`product-button ${
                        addedToCart[plant.name] ? "added-to-cart" : ""
                      }`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name]
                        ? "Added to Cart ✓"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
