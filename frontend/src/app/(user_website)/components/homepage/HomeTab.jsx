'use client'
import { useState } from 'react'
import CardUi from '../store/CardUi'
import NoProductFound from '../store/NoProductFound'

function HomeTab({ products }) {
  const [tab, setTab] = useState('best')
  const [limit, setLimit] = useState(5)

  return (
    <div className="rounded-[10px] px-3 md:px-6 bg-white py-5">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex items-center gap-x-4 uppercase text-sm md:text-base">
          <h2 onClick={() => setTab('best')} className={`cursor-pointer ${tab === 'best' ? 'font-bold' : 'text-[#666]'}`}>Best Seller</h2>
          <h2 onClick={() => setTab('new')} className={`cursor-pointer ${tab === 'new' ? 'font-bold' : 'text-[#666]'}`}>New in</h2>
          <h2 onClick={() => setTab('popular')} className={`cursor-pointer ${tab === 'popular' ? 'font-bold' : 'text-[#666]'}`}>Popular</h2>
        </div>
        <div onClick={() => setLimit(limit <= 5 ? Infinity : 5)} className="text-[12px] md:text-[13px] uppercase text-[#666] cursor-pointer">
          {limit <= 5 ? 'View All' : 'Show Less'}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-x-3 px-2 md:px-6">
        {tab === 'best' &&
          products.slice(0, limit).map((item, index) => <CardUi item={item} key={index} />)}
        {tab === 'new' &&
          products.slice(5, 10).map((item, index) => <CardUi item={item} key={index} />)}
        {tab === 'popular' &&
          (products.slice(10, 15).length > 0 ? (
            products.slice(10, 15).map((item, index) => <CardUi item={item} key={index} />)
          ) : (
            <div className="col-span-full">
              <NoProductFound />
            </div>
          ))}
      </div>
    </div>
  )
}

export default HomeTab
