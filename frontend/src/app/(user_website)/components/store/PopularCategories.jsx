import Link from "next/link";

function PopularCategories({ Categories }) {
  return (
    <main className="bg-white px-3 sm:px-4 py-5 sm:py-6 my-4">
      {/* Heading */}
      <h3 className="font-bold text-[15px] sm:text-[16px] md:text-[18px] uppercase mb-4 md:mb-6 text-center md:text-left tracking-wide">
        popular categories
      </h3>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 px-1 sm:px-3 md:px-5 py-4 sm:py-6">
        {Categories?.slice(0, 10)?.map((Category) => (
          <Link key={Category._id} href={`/store/${Category.slug}`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-y-2 sm:gap-x-4 md:gap-x-6 text-center sm:text-left transition-transform duration-300 hover:scale-[1.03]">
              {/* Image */}
              <div className="flex justify-center sm:block">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${Category.image}`}
                  alt={Category.image}
                  className="object-cover w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px] rounded-full shadow-sm"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold capitalize text-[12px] sm:text-[13px] md:text-[14px]">
                  {Category.name}
                </h3>
                <p className="text-[#666666] text-[10px] sm:text-[11px] md:text-[12px]">
                  {Category.productCount} items
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default PopularCategories;
