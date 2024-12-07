import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/Ecom-store';
import { createProduct,deleteProduct } from '../../api/Product'
import { toast } from 'react-toastify';
import Uploadfile from './Uploadfile';
import { Link } from 'react-router-dom';
import { Pencil, Trash } from 'lucide-react';
import { numberFormat } from '../../utils/number';
import { dateFormat } from '../../utils/dateformat';



const initialState = {

    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []

}

const FormProduct = () => {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    
    
    const [form, setForm] = useState({
            title: "",
            description: "",
            price: 0,
            quantity: 0,
            categoryId: '',
            images: []   
})
   //console.log(products)

    useEffect(() => {
        getCategory()
        getProduct(100)
    }, [])
    //console.log(categories)


    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value
            })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            console.log(res)
            setForm(initialState)
            getProduct(token)
            toast.success(` Add Product ${res.data.title}  successs`)
        } catch (err) {
            console.log(err)

        }

    }

    const handleDelete = async (id)=> {
        if(window.confirm("Are you sure you want to delete this product?")){
            try{
                const res = await deleteProduct(token,id)
                console.log(res)
                toast.success(` Deleted  ${res.data.title}  successs`)
                getProduct(token)
            }catch(err){
                console.log(err)
            }
            
        }
    }


    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1>Add Product detail</h1>
                <input
                    className='border '
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='Title'
                    name='title' />

                <input
                    className='border '
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='description'
                    name='description' />

                <input

                    className='border '
                    type='number'
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='price'
                    name='price' />

                <input
                    className='border '
                    type='number'
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder='quantity'
                    name='quantity' />



                <select className='border'
                    name='categoryId'
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled> Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }

                </select>
                <hr />
                  {/* upload filed */}
                  <Uploadfile  form={form} setForm={setForm}/>
                <button className='bg-blue-700 p-2 text-white rounded-md shadow-md mb-44'
                hover:scale-105 hover:translate-y-1  hover:duration-200
                    >Add Product</button>
                <br />
                <hr />



                <table className="table w-full border text-center">
                    <thead className='bg-gray-200 border'>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Update at</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item,index)=>{
                              //console.log(item)
                              return(
                                <tr key={index} className='text-center'>
                                <th scope="row">{index+1}</th>
                                    <td>
                                        {
                                            item.images.length > 0 
                                            ? <img 
                                            className="w-24 h-24 rounded-lg shadow-md my-4" 
                                            src={item.images[0].url}/>
                                            : <div
                                            className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-md"
                                            >No Image</div>
                                        }
                                    </td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{numberFormat(item.price)}</td>
                                <td>{item.sold  }</td>
                                <td>{item.quantity  }</td>
                                <td>{dateFormat(item.updatedAt ) }</td>
                                <td className="flex gap-2 my-12 ">
                                    <p className="bg-yellow-500 rounded-md p-1 shadow-md text-white
                                    hover:scale-105 hover:translate-y-1  hover:duration-200">
                                        <Link to ={"/admin/product/" + item.id}
                                        >
                                        <Pencil/>
                                        </Link>
                                        </p>
                                    <p
                                    className="bg-red-500 rounded-md p-1 shadow-md text-white
                                    hover:scale-105 hover:translate-y-1  hover:duration-200"
                                    onClick={()=>handleDelete(item.id)}
                                    ><Trash/>
                                    </p>
                                </td>
                            </tr>
                              )
                            }
                            )
                        }
                      
                    </tbody>
                </table>



            </form>
        </div>
    )
}

export default FormProduct