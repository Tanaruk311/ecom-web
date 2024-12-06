
import { getOrders } from '../../api/user'
import React,{useState,useEffect}from 'react'
import useEcomStore from '../../store/Ecom-store'
import { dateFormat } from '../../utils/dateformat'
import { numberFormat } from '../../utils/number'

const HistoryCard = () => {
    const [orders, setOrders] = useState([])
    const token = useEcomStore((state)=>state.token)
    


    useEffect(()=>{
        hdlgetOrders(token)
    },[])

    const hdlgetOrders = async(token)=>{
        getOrders(token)
        .then((res)=>{
            //console.log(res)
            setOrders(res.data.orders)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getStatusColor = (status) => {
        switch(status) {
            case "Not Process": 
                return "bg-gray-500";
            case "Processing":
                return "bg-blue-500";
        
            case "Completed":
                return "bg-green-500";
        
            case "Cancelled":
                return "bg-red-500";
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold my-4'> Order History </h1>

            {/* คลุม  */}
            <div className='space-y-4'>

                {/* card  lood order*/}
                {
                    orders?.map((item,index)=>{
                        // console.log(item)
                        return(
                            <div 
                            key={index}
                            className='border bg-gray-100 rounded-md shadow-md p-4'>

                            {/* header */}
                            <div className='flex justify-between ทิข/'>
                                <div>
                                    <p className='text-sm'>Order date</p>
                                    <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                                </div>
                                <div>
                                    <span className={`${getStatusColor(item.orderStatus)}
                                    px-2 py-1 rounded-full`}>
                                        {item.orderStatus}
                                        </span>
                                    
                                </div>
                            </div>
        
                            {/* table  loop Product*/}
                            <div>
                                <table className='border w-full  rounded-md'>
                                    <thead>
                                    <tr className='bg-gray-200'>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.products?.map((product,index)=>{
                                                //console.log(product)
                                                return(
                                                    <tr key={index}>
                                                    <td >{product.product.title}</td>
                                                    <td
                                                    className='text-center'
                                                    >{numberFormat(product.product.price)}</td>
                                                    <td
                                                    className='text-center'
                                                    >{product.count}</td>
                                                    <td
                                                    className='text-center'
                                                    >{numberFormat(product.count * product.product.price)}</td>
                                                </tr>
                                                )
                                            })
                                        }
                                   
                                    </tbody>
                                </table>
                            </div>
                            {/* total */}
                            <div>
        
                                <div className='text-right'>
                                    <p>Total net</p>
                                    <p>{numberFormat(item.cartTotal)}</p>
                                </div>
        
                            </div>
        
                        </div>
                        )
                    })
                }
               

            </div>
        </div>
    )
}

export default HistoryCard