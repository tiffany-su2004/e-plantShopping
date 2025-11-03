import React, { useState } from "react";
import "./ProductList.css";
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList() {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  // --- Plant Data (two categories minimum for Task 1 rubric) ---
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
    {
      category: "Decorative Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "images/snake.jpg",
          description: "Air-purifying plant with tall upright leaves.",
          cost: 14,
        },
        {
          name: "Peace Lily",
          image: "images/peacelily.jpg",
          description: "Elegant flowering plant ideal for indoor décor.",
          cost: 13,
        },
      ],
    },
  ];

  // --- Add-to-Cart Handler (core of Task 1) ---
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  // --- Render grouped plants ---
  return (
    <div className="product-grid">
      {plantsArray.map((category, index) => (
        <div key={index} className="category-section">
          <div className="plantname_heading">
            <h2 className="plant_heading">{category.category}</h2>
          </div>

          <div className="product-list">
            {category.plants.map((plant, i) => (
              <div key={i} className="product-card">
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
  );
}

export default ProductList;
