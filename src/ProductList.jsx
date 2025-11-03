import React, { useState } from "react";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  // ✅ Access cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Track locally which buttons are pressed
  const [addedToCart, setAddedToCart] = useState({});

  // ✅ Plant data — six plants, grouped in three categories
  const plantsArray = [
    {
      category: "Aromatic Plants",
      plants: [
        {
          name: "Lavender",
          image:
            "https://cdn.pixabay.com/photo/2016/06/13/09/28/lavender-1457172_1280.jpg",
          description: "Soothing fragrance and calming aroma.",
          cost: 12,
        },
        {
          name: "Rosemary",
          image:
            "https://cdn.pixabay.com/photo/2015/02/11/12/50/rosemary-631155_1280.jpg",
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
            "https://cdn.pixabay.com/photo/2016/03/05/19/02/aloe-vera-1236725_1280.jpg",
          description: "Healing plant for skin and overall wellness.",
          cost: 15,
        },
        {
          name: "Tulsi",
          image:
            "https://cdn.pixabay.com/photo/2018/03/25/13/31/tulsi-3253573_1280.jpg",
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
            "https://cdn.pixabay.com/photo/2020/05/14/10/53/houseplants-5178128_1280.jpg",
          description: "Air-purifying plant with tall upright leaves.",
          cost: 14,
        },
        {
          name: "Peace Lily",
          image:
            "https://cdn.pixabay.com/photo/2021/04/17/17/14/peace-lily-6185241_1280.jpg",
          description: "Elegant flowering plant ideal for indoor décor.",
          cost: 13,
        },
      ],
    },
  ];

  // ✅ Add-to-cart logic
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div className="product-page">
      {/* ✅ Navbar */}
      <div className="navbar">
        <div className="logo-section">
          <img
            src="https://cdn-icons-png.flaticon.com/512/766/766514.png"
            alt="logo"
            className="logo"
          />
          <div className="brand-text">
            <h2>Paradise Nursery</h2>
            <p>Where Green Meets Serenity</p>
          </div>
        </div>

        <div className="nav-links">
          <button className="nav-btn" onClick={onHomeClick}>
            Home
          </button>
          <span className="nav-title">Plants</span>
          <div className="cart-icon">
            🛒<span className="cart-count">{totalItems}</span>
          </div>
        </div>
      </div>

      {/* ✅ Product sections */}
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
                  <h3 className="product-name">{plant.name}</h3>
                  <p className="product-price">${plant.cost}</p>
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                    style={{
                      backgroundColor: addedToCart[plant.name]
                        ? "gray"
                        : "#4CAF50",
                    }}
                  >
                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
