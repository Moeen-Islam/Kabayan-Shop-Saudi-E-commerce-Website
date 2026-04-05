import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

const getGuestCustomerId = () => {
  const existing = localStorage.getItem("guestCustomerId");
  if (existing) return existing;

  const newId = `GUEST-${crypto.randomUUID()}`;
  localStorage.setItem("guestCustomerId", newId);
  return newId;
};

export const CartProvider = ({ children }) => {
  const guestCustomerId = getGuestCustomerId();
  const cartKey = `kabayan_cart_${guestCustomerId}`;

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(cartKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, cartKey]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (p) =>
          p.productId === item.productId &&
          p.sku === item.sku &&
          p.size === item.size &&
          p.colorName === item.colorName
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        toast.success("Cart updated");
        return updated;
      }

      toast.success("Added to cart");
      return [...prev, item];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed");
  };

  const clearCart = () => setCartItems([]);

  const subTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        guestCustomerId,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};