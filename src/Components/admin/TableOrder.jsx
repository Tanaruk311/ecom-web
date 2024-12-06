import React, { useEffect, useState } from 'react'
import { getOrdersAdmin, changeOrderStatus } from '../../api/admin'
import useEcomStore from '../../store/Ecom-store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'

const TableOrder = () => {
    const token = useEcomStore((state) => state.token)
    const [oreders, setOrders] = useState([])


    useEffect(() => {
        handleGetOrders(token)


    }, [])

    const handleGetOrders = async (token) => {
        getOrdersAdmin(token)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleChangeOrderStatus = async (token,orderId, orderStatus) => {
        console.log(orderId,orderStatus)
        changeOrderStatus(token,orderId, orderStatus)
        .then((res) => {
            console.log(res)
            toast.success("Update Status Success")
            handleGetOrders(token)
        })
        .catch((err) => {
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
        <div className='container mx-auto p-4 bg-white shadow-md'>

            <div>
                <table className='w-full'>
                    <thead>
                    <tr className='border bg-gray-200'>
                        <th>No</th>
                        <th>User</th>
                        <th>date</th>
                        <th>Product</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Manage</th>
                    </tr>
                    </thead>
                    <tbody>

                        {
                            oreders?.map((item,index)=>{
                                console.log(item)
                                return(
                                    <tr 
                                    className='border'
                                    key={index}>
                                    <td className='text-center'>{index+1}</td>
                                    <td>
                                        <p className='text-center'>{item.OrderedBy.email}</p>
                                        <p className='text-center'>{item.OrderedBy.address}</p>
                                        </td>
                                            <td>
                                                {dateFormat(item.createdAt)}
                                            </td>
                                    <td className='px-2 py-4'>
                                        
                                            {
                                                item.products?.map((product,index)=>
                                                    <div key={index}>
                                                    
                                                        <li > 
                                                        {product.product.title}
                                                        <span className='text-gray-800 text-sm text-center'> {product.count} x {" "}  {numberFormat(product.price)}</span>
                                                        </li>
                                                    </div>
                                                )
                                            }
                                             
                                            
                                            
                                            </td>




                                    <td 

                                    className='text-center'>
                                        {numberFormat(item.cartTotal)}</td>


                                    <td className='text-center'>
                                        <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                            {item.orderStatus}
                                            </span>
                                            </td>
                                   
                                   
                                    <td className='text-center'>

                                            <select
                                            value={item.orderStatus}
                                            onChange={(e)=>
                                                handleChangeOrderStatus (token,item.id,e.target.value)}>
                                                <option >Not Process</option>
                                                <option >Processing</option>
                                                <option >Completed</option>
                                                <option >Cancelled</option>
                                            </select>


                                    </td>
                                </tr>
                                )
                            })
                        }
                  
                    </tbody>
                 
                 
                </table>

            </div>

        </div>
    )
}

export default TableOrder