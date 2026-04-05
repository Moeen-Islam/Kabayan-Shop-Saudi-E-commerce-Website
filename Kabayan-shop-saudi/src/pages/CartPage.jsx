import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, subTotal } = useCart();
  const navigate = useNavigate();

  const discount = 0;
  const deliveryFee = 0;
  const total = subTotal - discount + deliveryFee;

  if (!cartItems.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <h1
          className="mb-8 text-3xl font-semibold text-black md:text-4xl"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Shopping Cart
        </h1>

        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-6 inline-block bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-85"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1
        className="mb-8 text-3xl font-semibold text-black md:text-4xl"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Left side */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {/* Header */}
          <div className="hidden grid-cols-[1.8fr_140px_120px_70px] border-b border-gray-200 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 md:grid">
            <div>Product</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Total</div>
            <div className="text-center">Action</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 px-4 py-5 md:grid-cols-[1.8fr_140px_120px_70px] md:px-6"
              >
                {/* Product */}
                <div className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f6f6f6]">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.productTitle}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="text-lg font-medium text-black"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {item.productTitle}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Color: {item.colorName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Code: {item.sku || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-start md:justify-center">
                  <div className="flex items-center rounded-full border border-gray-300 px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-black transition hover:bg-black hover:text-white"
                    >
                      -
                    </button>

                    <span className="min-w-[24px] text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-black transition hover:bg-black hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-start text-lg font-semibold text-black md:justify-center">
                  {Number(item.price) * item.quantity} SR
                </div>

                {/* Action */}
                <div className="flex items-center justify-start md:justify-center">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 transition hover:text-black"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side summary */}
        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
          <h2
            className="mb-5 text-xl font-semibold text-black"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Order Summary
          </h2>


          <div className="space-y-3 border-b border-gray-200 pb-5 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>Sub Total</span>
              <span>{subTotal.toFixed(2)} SR</span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <span>Discount</span>
              <span>-{discount.toFixed(2)} SR</span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>{deliveryFee.toFixed(2)} SR</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-5">
            <span className="text-base font-semibold text-black">Total</span>
            <span className="text-2xl font-semibold text-black">
              {total.toFixed(2)} SR
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="w-full rounded-full cursor-pointer bg-black px-6 py-4 text-sm font-medium text-white transition hover:opacity-85"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;