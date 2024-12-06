import React,{useEffect,useState} from 'react'
import { listUserCart,saveAddress } from '../../api/user'
import useEcomStore from '../../store/Ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'


const SummaryCard = () => {
    const token = useEcomStore((state)=>state.token)
    const [products, setProducts] =useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const [address, setAddress] = useState("")
    const [addressSaved, setAddressSaved] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
      hdlGetUserCart(token)
    },[])
  
    const hdlGetUserCart = (token) => {
        listUserCart(token)
        .then((res)=>{
            console.log(res)
            setProducts(res.data.products)
            setCartTotal(res.data.cartTotal)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    const hdSaveAddress = () => {
     
        if(!address){
            return toast.warning("Please enter your address")
        }
        saveAddress(token,address)
        .then((res)=>{
            console.log(res)
            toast.success(res.data.message);
            setAddressSaved(true)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const hdlGoToPayment = () => {
        if(!addressSaved){
            return toast.warning("Please enter your address")   
        }
        navigate("/user/payment")
    }


    console.log(products)

  return (
    <div className='mx-auto'>
        <div className='flex flex-warp gap-4 p-4'>
            {/* Left     */}
            <div className='w-2/4'>
            <div className='bg-gray-100 p-4 rounded-md border shadow-md
            space-y-2'>
             <h1 className='text-xl font-bold'>Address</h1>
             <textarea 
             required
             onChange={(e)=>setAddress(e.target.value)}
             placeholder='Enter your address'
              className='w-full px-2 rounded-md'/>
             <button 
             onClick={hdSaveAddress}
             className='bg-blue-500 text-white p-2 rounded-md shadow-md
             hover:bg-blue-700 hover:scale-105
             hover:duration-200'> Save Address</button>
             </div>
            </div>
            {/* Right     */}
            <div className='w-2/4'>
            <div className='bg-white p-4 rounded-md shadow-md border space-y-4'>
                <h1 className='text-lg font-bold'>Summary</h1>
                {/* Item list */}

                    {
                        products?.map((item,index)=>
                            <div key={index}>
                        <div className='flex justify-between items-center'>
                            <div>
                            <p className='font-bold'>{item.product.title}</p>
                            <p className='text=sm text-gray-500'>Quantity: {item.count}  x {numberFormat(item.product.price)}</p>
                            </div>
                            <div>
                            <p className='text-red-500 font-bold'>{numberFormat(item.count *  item.product.price)}</p>
                            </div>
                        </div>
                      
                    </div>
                        )
                    }

              

                    <div>
                        <div className='flex justify-between'>
                            <p>Shipping:</p>
                            <p>0.00</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>discount</p>
                            <p>0.00</p>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                            <p className='text-xl font-bold'>Total net:</p>
                            <p className='text-red-500 font-bold text-lg'>{numberFormat(cartTotal)}</p>
                        </div>  
                        <div>
                    <button 
                    onClick={hdlGoToPayment}
                   // disabled = {!addressSaved}
                    className='bg-green-500 text-white p-2 rounded-md shadow-md w-full'>Payment</button>
                </div>
          </div>
                </div>
                <hr />
                
        </div>
    </div>
  )
}

export default SummaryCard