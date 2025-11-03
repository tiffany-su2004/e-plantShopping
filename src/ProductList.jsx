import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import "./ProductList.css";
import CartItem from "./CartItem";

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  // Calculate total quantity for cart icon
  const calculateTotalQuantity = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  // Add-to-cart function
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  // Switch views
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };
  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // Six plants grouped into three categories
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

  return (
    <div>
      {/* ✅ Navbar Header */}
      <div className="navbar">
        <div className="logo-section">
          <img
            src="https://cdn-icons-png.flaticon.com/512/766/766514.png"
            alt="Paradise Nursery Logo"
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
          <button className="nav-btn" onClick={handleCartClick}>
            🛒 Cart <span className="cart-count">{calculateTotalQuantity()}</span>
          </button>
        </div>
      </div>

      {/* ✅ Conditional Rendering: Product page or Cart page */}
      {!showCart ? (
        <div className="product-page">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant, i) => (
                  <div key={i} className="product-card">
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
                      {addedToCart[plant.name]
                        ? "Added to Cart"
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
