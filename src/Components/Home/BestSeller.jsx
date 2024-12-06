import React,{useState,useEffect} from 'react'
import { listProductBy } from '../../api/Product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'


const BestSeller = () => {
const [data,setData] = useState([])

useEffect(()=>{
loadData(   )
},[])

const loadData = ()=>{
    listProductBy("sold","desc",12)
    .then((res)=>{
        setData(res.data)

    })
    .catch((err)=>console.log("error"))
}

    return (
    <SwiperShowProduct>
       {
    data?.map((item, index) => (
        <SwiperSlide key={index}>
            <ProductCard item={item} />
        </SwiperSlide>
    ))
}

    </SwiperShowProduct>
  )
}

export default BestSeller