import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ Import Provider and store
import { Provider } from "react-redux";
import store from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the whole app in Provider so Redux works globally */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
