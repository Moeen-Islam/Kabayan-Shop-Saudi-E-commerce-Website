import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AreaAutocomplete from "../components/AreaAutocomplete";
import LocationPicker from "../components/LocationPicker";
import { useCart } from "../context/CartContext";
import { createOrder } from "../lib/api";
import { getDeliveryInfo } from "../lib/delivery";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subTotal, clearCart, guestCustomerId } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    whatsapp: "",
    areaName: "",
    houseNo: "",
    paymentMethod: "COD",
    notes: "",
  });

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const deliveryInfo = getDeliveryInfo(form.areaName, subTotal);
  const grandTotal = subTotal + deliveryInfo.deliveryFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!form.customerName || !form.whatsapp || !form.areaName) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!cartItems.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!location) {
      toast.error("Please pin your location");
      return;
    }

    if (deliveryInfo.belowMinimum) {
      toast.error(deliveryInfo.message);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        guestCustomerId,
        customerName: form.customerName,
        whatsapp: form.whatsapp,
        areaName: form.areaName,
        houseNo: form.houseNo,
        paymentMethod: form.paymentMethod,
        notes: form.notes,
        location,
        items: cartItems,
        deliveryFee: deliveryInfo.deliveryFee,
        subTotal,
        grandTotal,
      };

      const result = await createOrder(payload);

      clearCart();
      toast.success("Order placed successfully");
      navigate(`/order-success/${result.orderNumber}`);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.error?.message || "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafafa] px-4 py-8 md:px-8 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <form
          onSubmit={handlePlaceOrder}
          autoComplete="off"
          className="grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          {/* fake hidden fields to confuse browser autofill */}
          <input
            type="text"
            name="fake_username"
            autoComplete="username"
            className="hidden"
            tabIndex={-1}
          />
          <input
            type="password"
            name="fake_password"
            autoComplete="new-password"
            className="hidden"
            tabIndex={-1}
          />

          {/* LEFT FORM */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8">
              <h1
                className="text-3xl font-semibold text-black md:text-4xl"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Checkout
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Fill in your delivery details to complete your order.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="kabayan_customer_name"
                  autoComplete="off"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                  value={form.customerName}
                  onChange={(e) =>
                    setForm({ ...form, customerName: e.target.value })
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Whatsapp Contact
                </label>
                <input
                  type="text"
                  name="kabayan_whatsapp"
                  autoComplete="off"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm({ ...form, whatsapp: e.target.value })
                  }
                  placeholder="Enter your Whatsapp number"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Area Name
                  </label>
                  <AreaAutocomplete
                    value={form.areaName}
                    onChange={(value) =>
                      setForm({ ...form, areaName: value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    House No. <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="kabayan_house_no"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                    value={form.houseNo}
                    onChange={(e) =>
                      setForm({ ...form, houseNo: e.target.value })
                    }
                    placeholder="House / Building / Flat"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Pinned Location
                </label>
                <LocationPicker value={location} onChange={setLocation} />

                {location && (
                  <div className="mt-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Selected:</span>{" "}
                      {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Payment Method
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      form.paymentMethod === "COD"
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === "COD"}
                      onChange={() =>
                        setForm({ ...form, paymentMethod: "COD" })
                      }
                      className="hidden"
                    />
                    <div className="text-sm font-medium">Cash on Delivery</div>
                    <div className="mt-1 text-xs opacity-80">
                      Pay when your order arrives
                    </div>
                  </label>

                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      form.paymentMethod === "STC_PAY"
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === "STC_PAY"}
                      onChange={() =>
                        setForm({ ...form, paymentMethod: "STC_PAY" })
                      }
                      className="hidden"
                    />
                    <div className="text-sm font-medium">STC PAY</div>
                    <div className="mt-1 text-xs opacity-80">
                      Pay on delivery
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Notes <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  rows="4"
                  name="kabayan_delivery_notes"
                  autoComplete="off"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                  placeholder="Any note for delivery"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2
              className="text-2xl font-semibold text-black"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-gray-200 pb-5 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{subTotal} SR</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>Delivery</span>
                <span>{deliveryInfo.deliveryFee} SR</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-5">
              <span className="text-base font-semibold text-black">Total</span>
              <span className="text-3xl font-semibold text-black">
                {grandTotal} SR
              </span>
            </div>

            <div className="mb-6 rounded-2xl bg-gray-50 p-4">
              <p className="text-xs leading-6 text-gray-500">
                {deliveryInfo.message}
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-black px-6 py-4 text-sm font-medium uppercase tracking-[0.08em] text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;