import React, { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux"; // ✅ added useSelector
import { addItem } from "./CartSlice"; // ✅ correct Redux action name

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  // ✅ Access global cart state from Redux
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Calculate total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return cartItems
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  // ✅ Plant data
  const plantsArray = [
    {
      category: "Aromatic Plants",
      plants: [
        {
          name: "Lavender",
          image: "images/lavender.jpg",
          description: "Soothing fragrance and calming aroma.",
          cost: 12,
        },
        {
          name: "Rosemary",
          image: "images/rosemary.jpg",
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
          image: "images/aloe.jpg",
          description: "Healing plant for skin and overall wellness.",
          cost: 15,
        },
        {
          name: "Tulsi",
          image: "images/tulsi.jpg",
          description: "Known for its medicinal and spiritual value.",
          cost: 8,
        },
      ],
    },
  ];

  // ✅ Navbar inline styling
  const styleObj = {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
  };

  const styleObjUl = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "1100px",
  };

  const styleA = {
    color: "white",
    fontSize: "30px",
    textDecoration: "none",
    position: "relative",
  };

  // ✅ Handlers
  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // ✅ Add-to-cart logic
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant)); // send to Redux store
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      {/* ✅ Navbar Section */}
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="Paradise Nursery logo"
              height="60"
              style={{ marginRight: "10px" }}
            />
            <a href="/" onClick={(e) => handleHomeClick(e)}>
              <div>
                <h3 style={{ color: "white" }}>Paradise Nursery</h3>
                <i style={{ color: "white" }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
              Plants
            </a>
          </div>

          {/* ✅ Cart icon with live quantity counter */}
          <div>
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              <h1 className="cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>

                {/* 🔢 Cart quantity badge */}
                <span
                  className="cart-count"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "-5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "18px",
                    padding: "2px 10px",
                  }}
                >
                  {calculateTotalQuantity()}
                </span>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Main Content */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <div className="plantname_heading">
                <h2 className="plant_heading">{category.category}</h2>
              </div>

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
