import axios from "axios";

export const creatCategory = async (token,form) => {
     return await axios.post("https://ecom-api-snowy.vercel.app/api/category",form,{
            headers: {
                Authorization: `Bearer ${token}`
            }
     })
}

export const listCategory = async () => {
    return await axios.get("https://ecom-api-snowy.vercel.app/api/category",{

    })
}

export const removeCategory = async (token,id) => {
    return await axios.delete("https://ecom-api-snowy.vercel.app/api/category/"+id,{
           headers: {
               Authorization: `Bearer ${token}`
           }
    })
}