import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import "./index.css";
import router from "./router";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </CartProvider>
  </React.StrictMode>
);