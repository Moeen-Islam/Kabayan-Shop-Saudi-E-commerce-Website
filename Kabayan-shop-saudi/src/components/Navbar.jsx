import { Link } from "react-router-dom";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const cart = useCart();
  const cartItems = cart?.cartItems || [];

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-xl font-semibold tracking-[0.2em] text-black"
          >
            KABAYAN
          </Link>
        </div>

        {/* Center */}
        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
          <Link
            to="/shop"
            className="text-sm font-medium uppercase tracking-wide text-black transition hover:text-gray-500"
          >
            Products
          </Link>

        </nav>

        {/* Right */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <Link
            to="/contact"
            className="hidden text-sm font-medium uppercase tracking-wide text-black transition hover:text-gray-500 md:inline-block"
          >
            Contact Us
          </Link>

          <Link
            to="/cart"
            className="relative gap-2 inline-flex items-center text-black transition hover:text-gray-500"
            aria-label="Cart"
          >
            Cart 
            <ShoppingBag size={22} strokeWidth={1.8} />
            {cartItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
