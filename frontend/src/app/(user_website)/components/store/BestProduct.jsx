import CardUi from './CardUi'
function BestProduct({ products }) {

  return (
    <div className="pb-6 border-gray-300 border-b-[1px] mb-6">
      <h3 className="font-bold uppercase text-[18px]  text-center sm:text-left">
        Best seller in this category
      </h3>
      {/* Cards Grid */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((item) => (
          <CardUi item={item} key={item._id} />
        ))}

      </div>
    </div>

  )
}

export default BestProduct