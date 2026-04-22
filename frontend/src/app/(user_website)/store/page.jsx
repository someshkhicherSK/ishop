import { getBrands, getCategory, getProduct } from "../../../../library/api_calls";
import CardUi from "../components/store/CardUi";
async function StorePage({ searchParams }) {
  const { brand } = await searchParams ?? null;
  const { color } = await searchParams ?? null;
  const { min } = await searchParams ?? null;
  const { max } = await searchParams ?? null;
  const products = await getProduct(null, null, brand, color,min,max);

  return (
    <div className="pb-6 border-gray-300 border-b-[1px] mb-6">
      <h3 className="font-bold uppercase text-[18px]  text-center sm:text-left">
        Best Products in this Website
      </h3>
      {/* Cards Grid */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((item) => (
          <CardUi item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default StorePage;



