import React,{useState,useEffect} from 'react'
import { Swiper, SwiperSlide} from 'swiper/react';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination,Autoplay, Navigation } from 'swiper/modules';

const ContentCarousel = () => {

    const [data,setData] = useState([])

    useEffect(() => {
            hdlgetImage()   
    },[])
    const hdlgetImage = ()=> {

       
     axios.get("https://picsum.photos/v2/list?page=1&limit=20")
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
        })
        .catch(res => console.log(res))
    }


    return (
        <div >
            <Swiper 
            pagination={true} modules={[Pagination,Autoplay]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            
            
            className="mySwiper w-full h-80 object-cover rounded-md mb-4">
                {
                    data?.map((item,index)=>
                    <SwiperSlide key={index}>
                       <img src={item.download_url}  />
                    </SwiperSlide>
                    )
                }
                
            </Swiper>
            
            <Swiper 
              slidesPerView={5}
              spaceBetween={10}
            pagination={true}
            navigation={true}
            
            modules={[Pagination,Autoplay,Navigation]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            
            
            className="mySwiper w-full  object-cover rounded-md">
                {
                    data?.map((item,index)=>
                    <SwiperSlide key={index}>
                       <img src={item.download_url} 
                       className='rounded-md' />
                    </SwiperSlide>
                    )
                }
                
            </Swiper>
            
         

        </div>
    )
}

export default ContentCarousel
