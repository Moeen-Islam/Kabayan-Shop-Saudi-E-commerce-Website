import { Link } from "react-router-dom";
import { getImageUrl } from "../lib/api";

const ProductCard = ({ product }) => {
  const imageUrl = getImageUrl(product.thumbnail);

  return (
    <div className="group rounded-xl bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="rounded-lg bg-[#f6f6f6] ">
        <div className="flex h-75 items-center justify-center overflow-hidden rounded-md bg-white">
          <img
            src={imageUrl}
            alt={product.title}
            className="max-h-full w-full rounded-md object-contain transition duration-600 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="px-1 pt-4 pb-2">
        <h3
          className="text-base font-medium text-black"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {product.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {product.category || "Fashion"}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-semibold text-black">
            SAR {product.basePrice}
          </p>

          <Link
            to={`/product/${product.documentId || product.id}`}
            className="rounded-md bg-black px-4 py-2 text-xs text-white transition hover:opacity-80"
          >
            Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;