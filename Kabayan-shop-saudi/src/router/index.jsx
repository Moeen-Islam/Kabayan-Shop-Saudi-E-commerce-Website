import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ShopPage from "../pages/ShopPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import ContactPage from "../pages/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ShopPage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "product/:id", element: <ProductDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order-success/:orderNumber", element: <OrderSuccessPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);

export default router;