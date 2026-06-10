import { Axiosinstance } from "@/app/utils/helper";

const API_TIMEOUT = 30000;

export const getCategory = async (id = null) => {
  try {
    const API = id ? `category/get/${id}` : "category/get";
    const res = await Axiosinstance.get(API, { timeout: API_TIMEOUT });
    return res.data;
  } catch (e) {
    console.log("CATEGORY ERROR:", e.message);
    return { data: [] };
  }
};

export const getProduct = async (
  id = null,
  categorySlug = null,
  brandSlug = null,
  colorSlug = null,
  min = null,
  max = null
) => {
  try {
    const API = id ? `product/get/${id}` : "product/get";

    const query = new URLSearchParams();

    if (categorySlug) query.append("categorySlug", categorySlug);
    if (brandSlug) query.append("brandSlug", brandSlug);
    if (colorSlug) query.append("colorSlug", colorSlug);
    if (min) query.append("min", min);
    if (max) query.append("max", max);

    const res = await Axiosinstance.get(`${API}?${query}`, {
      timeout: API_TIMEOUT,
    });
    return res.data.getProduct || [];
  } catch (e) {
    console.log("PRODUCT ERROR:", e.message);
    return [];
  }
};

export const getColors = async (id = null) => {
  try {
    const API = id ? `color/get/${id}` : "color/get";
    const res = await Axiosinstance.get(API, { timeout: API_TIMEOUT });
    return res.data.getColor || [];
  } catch (e) {
    console.log("COLOR ERROR:", e.message);
    return [];
  }
};

export const getBrands = async (id = null) => {
  try {
    const API = id ? `brands/get/${id}` : "brands/get";
    const res = await Axiosinstance.get(API, { timeout: API_TIMEOUT });
    return res.data;
  } catch (e) {
    console.log("BRAND ERROR:", e.message);
    return id ? { getBrand: null } : { data: [] };
  }
};
