import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchFilteredProducts } from "../lib/api";

const categories = ["Abaya", "Dress", "Terno", "Jacket", "Top", "Sweater"];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "sortOrder:asc",
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchFilteredProducts(filters);
        setProducts(data || []);
      } catch (error) {
        console.error("Error loading filtered products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters]);

  return (
    <div className="bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1
            className="text-3xl font-semibold text-black md:text-4xl"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Browse Products
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Explore the latest styles from Kabayan Shop Saudi
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left / Top: Filter panel */}
          <aside className="order-1 h-fit border border-gray-200 bg-white p-5">
            <h2 className="mb-5 text-lg font-semibold text-black">Filters</h2>

            <div className="border-b border-gray-200 pb-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black">
                Category
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, category: "" }))
                  }
                  className={`block text-left text-sm ${
                    filters.category === ""
                      ? "font-semibold text-black"
                      : "text-gray-500"
                  }`}
                >
                  All
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, category: cat }))
                    }
                    className={`block text-left text-sm ${
                      filters.category === cat
                        ? "font-semibold text-black"
                        : "text-gray-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-200 py-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black">
                Price
              </h3>

              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
                />

                <input
                  type="number"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="pt-5">
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    category: "",
                    minPrice: "",
                    maxPrice: "",
                    sort: "sortOrder:asc",
                  })
                }
                className="w-full border border-black px-4 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Right / Bottom: Products */}
          <div className="order-2">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-gray-500">
                Showing {products.length} product
                {products.length !== 1 ? "s" : ""}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="Search products"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="w-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-black sm:w-64"
                />

                <select
                  value={filters.sort}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sort: e.target.value }))
                  }
                  className="border border-gray-200 px-4 py-2 text-sm outline-none focus:border-black"
                >
                  <option value="sortOrder:asc">Default</option>
                  <option value="basePrice:asc">Price: Low to High</option>
                  <option value="basePrice:desc">Price: High to Low</option>
                  <option value="title:asc">Name: A-Z</option>
                  <option value="title:desc">Name: Z-A</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="py-20 text-center text-gray-500">
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.documentId || product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
