const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:1337/api",
});

export const getImageUrl = (image) => {
  if (!image) return "";

  // Strapi media can come in different shapes
  const url =
    image.url ||
    image?.data?.attributes?.url ||
    image?.data?.url ||
    image?.formats?.medium?.url ||
    image?.formats?.small?.url ||
    image?.attributes?.url;

  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${import.meta.env.VITE_API_URL}${url}`;
};

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/api/products?populate=*`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();
  return result.data || [];
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/api/products/${id}?populate=*`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const result = await res.json();
  return result.data;
};

export const fetchAreas = async (query) => {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch areas");
    }

    const data = await res.json();

    return data.map((item, index) => ({
      id: item.place_id || index,
      name: item.display_name,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    console.error("Error fetching areas:", error);
    return [];
  }
};

export const fetchFilteredProducts = async ({
  search = "",
  category = "",
  minPrice = "",
  maxPrice = "",
  sort = "sortOrder:asc",
} = {}) => {
  const params = new URLSearchParams();

  params.append("populate", "*");
  params.append("sort[0]", sort);
  params.append("filters[isActive][$eq]", "true");

  if (search) {
    params.append("filters[title][$containsi]", search);
  }

  if (category) {
    params.append("filters[category][$eq]", category);
  }

  if (minPrice !== "") {
    params.append("filters[basePrice][$gte]", minPrice);
  }

  if (maxPrice !== "") {
    params.append("filters[basePrice][$lte]", maxPrice);
  }

  const { data } = await API.get(`/api/products?${params.toString()}`);
  return data.data;
};

export const createOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/api/public-orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.error?.message || result?.message || "Failed to create order");
  }

  return result;
};