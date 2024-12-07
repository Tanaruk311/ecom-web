import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/Ecom-store';
import { createProduct,readProduct,listProduct,updateProduct } from '../../api/Product'
import { toast } from 'react-toastify';
import Uploadfile from './Uploadfile';
import { useParams,useNavigate } from 'react-router-dom';



const initialState = {

    title: "Core i9",
    description: "desc",
    price: 5590,
    quantity: 8,
    categoryId: '',
    images: []

}

const FormEditProduct = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const [form, setForm] = useState(initialState);
  
   //console.log(products)

    useEffect(() => {
        getCategory()
        fetchhProduct(token,id,form)
     
    }, [])
    //console.log(categories)

    const fetchhProduct = async (token,id ,form)=> {
        try {
            const res = await readProduct(token,id,form)
            console.log("res from backend",res)
            setForm(res.data)
        }catch(err){
            console.log(err)
        }
    }


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
            const res = await updateProduct(token,id, form)
            console.log(res)
            toast.success(` Add Product ${res.data.title}  successs`)
            navigate("/admin/product")
        } catch (err) {
            console.log(err)

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
                <button className='bg-blue-700 text-white rounded-sm shadow-lg'>Edit Product</button>
                <br />
                <hr />


            </form>
        </div>
    )
}

export default FormEditProduct