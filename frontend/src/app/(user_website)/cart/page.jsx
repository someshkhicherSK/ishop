
import { getProduct } from '../../../../library/api_calls'
import CartItems from '../components/CartItems'

async function page() {
    const product = await getProduct();
  return <CartItems product={product}/>
}

export default page