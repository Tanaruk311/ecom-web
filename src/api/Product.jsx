import axios from "axios";
//

export const createProduct = async (token, form) => {
    return await axios.post("https://ecom-api-snowy.vercel.app/api/product", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listProduct = async (count = 20) => {
    return await axios.get("https://ecom-api-snowy.vercel.app/api/products/" + count 
     
        
    )
}
export const readProduct = async (token, id) => {
    return await axios.get("https://ecom-api-snowy.vercel.app/api/product/" + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const deleteProduct = async (token, id) => {
    return await axios.delete("https://ecom-api-snowy.vercel.app/api/product/" + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const updateProduct = async (token, id,form) => {
    return await axios.put("https://ecom-api-snowy.vercel.app/api/product/" + id,form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const uploadFiles = async (token, form,) => {
    // console.log("form api frontend", form)
    return await axios.post("https://ecom-api-snowy.vercel.app/api/images", {
        image: form
    },


        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}
export const removeFiles = async (token, public_id,) => {
    // console.log("form api frontend", form)
    return await axios.post("https://ecom-api-snowy.vercel.app/api/removeimages", {
        public_id
    },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const searchfilters = async (arg) => {
    return await axios.post("https://ecom-api-snowy.vercel.app/api/search/filters",arg)

}


export const listProductBy = async (sort,order,limit) => {
    return await axios.post("https://ecom-api-snowy.vercel.app/api/productby",{sort,order,limit})

}


