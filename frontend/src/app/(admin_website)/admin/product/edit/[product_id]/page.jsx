import ProductEdit from '@/app/(admin_website)/components/ProductEdit'
import { getBrands, getCategory, getColors } from '../../../../../../../library/api_calls';

async function page() {
   const category =  await getCategory();
    const brands = await getBrands();
    const color = await getColors();
  return (
    <div className='p-5 w-full '>
      <ProductEdit category={category} brands={brands} color={color} />
    </div>
  )
}

export default page