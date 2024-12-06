import React, { useEffect } from 'react'
import ProductCard from '../Components/card/ProductCard'
import useEcomStore from '../store/Ecom-store'
import SearchCard from '../Components/card/SearchCard'
import { Car } from 'lucide-react'
import CartCard from '../Components/card/CartCard'

const Shop = () => {
 const getProduct = useEcomStore((state)=> state.getProduct)
  const products = useEcomStore((state)=> state.products)



  useEffect(()=>{

  getProduct()
  },[])
    
  
  return (
    <div className='flex'>
      {/* searchbar */}
      <div className='w-1/4 p-4 bg-gray-100 h-screen'>
        <SearchCard />
      </div>
      {/* product*/}
      <div className=' p-4 w-1/2 h-screen overflow-y-auto'>
      <p className='text-2xl font-bold mb- 4'>Product</p>
      <div className='flex flex-wrap gap-4'>
      {/* product  card */}
      {
        products.map((item,index)=>
          <ProductCard  key={index} item={item}/>
        )
      }

   
    


         {/* product  card */}
      </div>
      
      </div>
      {/* cart */}
      <div className=' w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto'>
        <CartCard />
      </div>
    </div>
  )
}

export default Shop