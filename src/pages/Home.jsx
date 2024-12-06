import React from 'react'
import ContentCarousel from '../Components/Home/ContentCarousel'
import BestSeller from '../Components/Home/BestSeller'
import NewProduct from '../Components/Home/NewProduct'





const Home = () => {
  return (
    <div>
    
       <ContentCarousel />

       <p className='text-2xl text-center my-4'>Best seller</p>
       <BestSeller  />


       <p className='text-2xl text-center my-4'>New Products</p>
       <NewProduct />
       
    


   
    </div>
  )
}

export default Home