import React from 'react'
import TopMain from './components/homepage/TopMain'
import FretureBrand from './components/homepage/FretureBrand'
import DealsSec from './components/homepage/DealsSec'
import TopSelling from './components/homepage/TopSelling'
import BestSelling from './components/homepage/BestSelling'
import InfoSection from './components/homepage/InfoSection'
import { getBrands, getCategory, getProduct } from "../../../library/api_calls";
async function page() {
    const Categories = await getCategory(null);
    const Brands = await getBrands(null)
    const products = await getProduct(null)
  return (
    <>
    <TopMain Categories={Categories.data}/>
    <FretureBrand Brands={Brands.data} Categories={Categories.data}/>
    <DealsSec producte={products}/>
    <TopSelling products={products}/>
    <BestSelling products={products}/>
    <InfoSection/>
    </>
  )
}

export default page