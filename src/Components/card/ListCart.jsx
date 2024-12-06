import React from 'react'
import { ListChecks } from 'lucide-react';
import useEcomStore from '../../store/Ecom-store';
import {Link,useNavigate} from 'react-router-dom'
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';
import { numberFormat } from '../../utils/number';


const ListCart = () => {
const cart = useEcomStore((state) => state.carts)
const user = useEcomStore((state) => state.user)
const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
const token = useEcomStore((state) => state.token)

const navigate = useNavigate()


const handleSaveCart = async() =>  {
 await createUserCart(token,{cart})
 .then((res)=>{
 console.log(res)
 toast.success("Save cart success",{position:"top-center"});
 navigate("/checkout")
})
 .catch((err)=>{
    console.log(err)
    toast.warning(err.response.data.message)
})
}


    return (
        <div className='bg-gray-100 rounded-sm p-4  '>
            {/* Header */}
            <div className='flex gap-4 mb-4'>
                <ListChecks size={36} />
                <span className='text-2xl font-bold'>Product list {cart.length} items</span>
            </div>
            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" >

           
            {/* Left */}
            <div className='col-span-2'>

                {/*card  */}
                {
                    cart.map((item, index) =>

                        <div key={index} className='bg-white p-2 rounded-md shadow-md mb-4'>
                            {/* Row 1 */}
                            <div className='flex justify-between mb-2'>
                                {/* Left */}
                                <div className='flex gap-2 items-center'>
                                    {/* Image */}

                                    {
                                        item.images && item.images.length > 0
                                            ? <img
                                                className='w-16 h-16 rounded-md  shadow-md object-cover'
                                                src={item.images[0].url} alt="" />
                                            : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>
                                                No Image
                                            </div>
                                    }
                                    <div>
                                        <p className='font-bold '>{item.title}</p>
                                        <p className='text-sm'>{numberFormat(item.price)}x {item.count}</p>
                                    </div>
        
                                </div>

                                <div>
                                      <div className='font-bold text-blue-500'>
                                        {numberFormat(item.price * item.count)}
                                </div>
                                </div>
                                
                            </div>
                           
                        </div>
                    )
                }


            </div>
            {/* Right */}
            <div className='bg-white p-4 rounded-md shadow-md space-y-4'>
            <span className='font-bold text-2xl'>Total</span>
            <div className='flex justify-between'>
                <span>Total net</span>
                <span className='font-bold text-2xl'>{numberFormat(getTotalPrice())}</span>
            </div>

            <div className='flex flex-col gap-2'>

            {
                user
                ?  <Link>
                <button
                disabled={cart.length < 1} 
                onClick={handleSaveCart} 
                className='bg-blue-500 rounded-md p-2 w-full text-white shadow-md 
                hover:bg-blue-700'>payment</button>
                </Link>
    
                : <Link to={"/login"}>
                <button className='bg-white-500 rounded-md p-2 w-full text-black shadow-md 
                hover:bg-blue-700'>login</button>
                </Link>
    
            }
            

           <Link to={"/shop"}>
            <button className='bg-gray-500 rounded-md p-2 w-full text-white shadow-md
            hover:bg-gray-700'>Edit payment</button>
            </Link>
            </div>
         
            </div>
        </div>
        </div>
    )
}

export default ListCart