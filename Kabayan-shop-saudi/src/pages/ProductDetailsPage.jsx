import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, getImageUrl } from "../lib/api";
import { useCart } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const result = await fetchProductById(id);
        setProduct(result);

        if (result?.variants?.length) {
          setSelectedColor(result.variants[0].colorName || "");
        }

        if (result?.availableSizes?.length) {
          setSelectedSize(result.availableSizes[0]);
        }
      } catch (error) {
        console.error("Failed to load product details:", error);
      }
    };

    loadProduct();
  }, [id]);

  const variants = product?.variants || [];
  const availableSizes = product?.availableSizes || [];

  const selectedVariant = useMemo(() => {
    return variants.find((variant) => variant.colorName === selectedColor) || null;
  }, [variants, selectedColor]);

  if (!product) {
    return <div className="mx-auto max-w-7xl px-6 py-16">Loading...</div>;
  }

  const image = selectedVariant?.variantImage || product.thumbnail;
  const finalPrice = selectedVariant?.price || product.basePrice;

  const handleAdd = () => {
    if (!selectedVariant || !selectedSize) return;

    addToCart({
      id: crypto.randomUUID(),
      productId: product.documentId || product.id,
      productTitle: product.title,
      productSlug: product.slug,
      sku: selectedVariant.sku,
      colorName: selectedVariant.colorName,
      size: selectedSize,
      price: selectedVariant.price || product.basePrice,
      quantity,
      thumbnailUrl: getImageUrl(image),
    });
  };

  return (
    <div className="bg-white px-4 py-8 md:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="rounded-2xl bg-[#f7f7f7] p-4 md:p-5">
            <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-[#eef2f5] p-6 md:min-h-[500px]">
              <img
                src={getImageUrl(image)}
                alt={product.title}
                className="max-h-[440px] w-full object-contain"
              />
            </div>
          </div>

          <div className="border border-gray-200 bg-white p-5 md:p-6 lg:sticky lg:top-24">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
              Product Details
            </p>

            <h1
              className="mt-2 text-2xl font-semibold leading-tight text-black md:text-3xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {product.title}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Item code: {selectedVariant?.sku || "N/A"}
            </p>

            <div className="mt-5 border-t border-gray-200 pt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Description
              </p>
              <p className="text-sm leading-6 text-gray-600">
                {product.description || "No description available."}
              </p>
            </div>

            <div className="mt-5 border-t border-gray-200 pt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Price
              </p>
              <p className="text-2xl font-semibold text-black">
                SAR {finalPrice}
              </p>
            </div>

            <div className="mt-5 border-t border-gray-200 pt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Color
              </p>

              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border border-gray-200 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none transition focus:border-black"
              >
                {variants.map((variant) => (
                  <option key={variant.sku} value={variant.colorName}>
                    {variant.colorName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Size
              </p>

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-gray-200 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none transition focus:border-black"
              >
                {availableSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Quantity
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="flex h-10 w-10 items-center justify-center border border-gray-200 text-lg text-black transition hover:bg-black hover:text-white"
                >
                  -
                </button>

                <div className="flex h-10 min-w-[64px] items-center justify-center border border-gray-200 bg-[#f8f8f8] px-4 text-sm font-medium text-black">
                  {quantity}
                </div>

                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="flex h-10 w-10 items-center justify-center border border-gray-200 text-lg text-black transition hover:bg-black hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleAdd}
                disabled={!selectedVariant || !selectedSize}
                className="w-full bg-black px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;