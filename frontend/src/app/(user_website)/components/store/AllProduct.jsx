import { FaArrowDown } from "react-icons/fa";
import CardUi from "./CardUi";
import Pagenation from "./Pagenation";

const products = [
  {
    name: "SROK Smart Phone 128GB, Oled Retina",
    img: "/product/prod30.png",
    alt: "prod30",
    price: "$579.00",
    mrp: "$859.00",
    shipping: "free shipping",
    stock: "In stock",
    diccount: "$54.00",
    count: "(152)",
    gift: "FREE GIFT",
  },

  {
    name: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
    img: "/product/prod31.png",
    alt: "prod31",
    price: "$979.00",
    mrp: "$1,259.00",
    shipping: "$2.98 SHIPPING",
    stock: "In stock",
    diccount: "$87.00",
    count: "(14)",
  },
  {
    name: "Samsung Galaxy X6 Ultra LTE 4G/128 Gb, Black Smartphone",
    img: "/product/prod32.png",
    alt: "prod32",
    price: "$659.00",
    mrp: "$788.00",
    shipping: "free shipping",
    stock: "In stock",
    diccount: "$59.00",
    count: "(5)",
  },
  {
    name: "Xiaomi Redmi Note 5, 64GB",
    img: "/product/prod33.png",
    alt: "prod33",
    price: "$1,239.00",
    mrp: "$1,619.00",
    shipping: "free shipping",
    stock: "out of stock",
    diccount: "$59.00",
    count: "(9)",
    gift: "FREE GIFT",
  },
  {
    name: "Microsute Alpha Ultra S5 Surface 128GB 2022, Silver",
    img: "/product/prod34.png",
    alt: "prod34",
    price: "$1,729.00",
    mrp: "$2134.00",
    shipping: "free shipping",
    stock: "In Stock",
    diccount: "$2.00",
    count: "(8)",
  },
  {
    name: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
    img: "/product/prod35.png",
    alt: "prod35",
    price: "$569.00",
    mrp: "$759.00",
    shipping: "free shipping",
    stock: "In stock",
    diccount: "$199.00",
    count: "(152)",
    gift: "FREE GIFT",
  },
  {
    name: "Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone",
    img: "/product/prod36.png",
    alt: "prod36",
    price: "$59.00",
    mrp: "$129.00",
    shipping: "free shipping",
    stock: "In stock",
    diccount: "$23.00",
    count: "(2)",
  },
  {
    name: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular",
    img: "/product/prod37.png",
    alt: "prod37",
    price: "$279.00",
    mrp: "$232.00",
    shipping: "$2.98 SHIPPING",
    stock: "In stock",
    diccount: "$0.00",
    count: "(42)",
    gift: "FREE GIFT",
  },
  {
    name: "Lenovo Redmi Note 5, 64GB",
    img: "/product/prod38.png",
    alt: "prod38",
    price: "$69.00",
    mrp: "$82.00",
    shipping: "free shipping",
    stock: "In stock",
    diccount: "$23.00",
    count: "(44)",
  },
  {
    name: "LG Pro Tablet 2023 LTE + Wifi, GPS Cellular",
    img: "/product/prod39.png",
    alt: "prod39",
    price: "$179.00",
    mrp: "$429.00",
    shipping: "$2.98 SHIPPING",
    stock: "PRE-ORDER",
    diccount: "$34.00",
    count: "(23)",
  },
  {
    name: "Samsung Galaxy X6 Ultra LTE 4G/128 Gb, Black Smartphone",
    img: "/product/prod40.png",
    alt: "prod40",
    price: "$659.00",
    mrp: "$988.00",
    shipping: "free shipping",
    stock: "In stock",
    diccount: "$169.00",
    count: "(5)",
  },
  {
    name: "SROK Smart Phone 128GB, Oled Retina",
    img: "/product/prod41.png",
    alt: "prod41",
    price: "$579.00",
    mrp: "$859.00",
    shipping: "free shipping",
    stock: "In stock",
    diccount: "$199.00",
    count: "(152)",
    gift: "FREE GIFT",
  },
  {
    name: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
    img: "/product/prod42.png",
    alt: "prod42",
    price: "$979.00",
    mrp: "$1,259.00",
    shipping: "$2.98 SHIPPING",
    stock: "In stock",
    diccount: "$97.00",
    count: "(44)",
  },
  {
    name: "Samsung Galaxy X6 Ultra LTE 4G/128 Gb, Black Smartphone",
    img: "/product/prod43.png",
    alt: "prod43",
    price: "$659.00",
    mrp: "$876.00",
    shipping: "free shipping",
    stock: "In stock",
    diccount: "$87.00",
    count: "(5)",
    gift: "FREE GIFT",
  },
  {
    name: "Xiaomi Redmi Note 5, 64GB",
    img: "/product/prod44.png",
    alt: "prod44",
    price: "$1,239.00",
    mrp: "$1,619.00",
    shipping: "FREE SHIPPING",
    stock: "Contact",
    diccount: "$59.00",
    count: "(9)",
  },
  {
    name: "SROK Smart Phone 128GB, Oled Retina",
    img: "/product/prod45.png",
    alt: "prod45",
    price: "$579.00",
    mrp: "$859.00",
    shipping: "free shipping",
    stock: "In stock",
    diccount: "$199.00",
    count: "(152)",
    gift: "FREE GIFT",
  },
];

function AllProduct() {
  return (
    <div className="pb-6 border-gray-300">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-x-8 items-start sm:items-center justify-between mb-4">
        {/* Results Count */}
        <div className="text-sm sm:text-base">1 - 40 of 120 results</div>

        {/* Show Items per Page */}
        <div className="flex items-center gap-x-2">
          <div className="text-sm sm:text-base">Show item</div>
          <div className="bg-[#EEEFF6] py-1 px-3 sm:py-2 sm:px-4 rounded-[7px] flex items-center gap-x-3 text-sm sm:text-base">
            <span className="font-bold">24</span>
            <span>48</span>
            <span>72</span>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-x-2">
          <div className="text-sm sm:text-base">Sort by</div>
          <div className="bg-[#EEEFF6] py-1 sm:py-2 w-[120px] sm:w-[160px] px-2 rounded-[7px] flex items-center justify-between text-sm sm:text-base">
            <span className="font-bold">Default</span>
            <span>
              <FaArrowDown />
            </span>
          </div>
        </div>

        {/* View As */}
        <div className="hidden sm:block text-sm sm:text-base">View As</div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item, index) => (
          <CardUi item={item} key={index + 1} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagenation />
      </div>
    </div>
  );
}

export default AllProduct;
