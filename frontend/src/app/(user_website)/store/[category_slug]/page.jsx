import { getProduct } from "../../../../../library/api_calls";
import CardUi from "../../components/store/CardUi";
import NoProductFound from "../../components/store/NoProductFound";

async function StorePage({ params, searchParams }) {
  const { category_slug } = await params;
  const { brand, color } = searchParams ?? {};
  
  const products = await getProduct(null, category_slug, brand, color);
  console.log(products);

  return (
    <div className="pb-6 border-gray-300 border-b-[1px] mb-6">
      <h3 className="font-bold uppercase text-[18px] text-center sm:text-left">
        Best seller in this category
      </h3>
      {products && products.length > 0 ? (
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((item) => (
            <CardUi item={item} key={item._id} />
          ))}
        </div>
      ) : (
        <NoProductFound />
      )}
    </div>
  );
}

export default StorePage;
