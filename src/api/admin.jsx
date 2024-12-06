import axios from "axios";


//https://ecom-api-snowy.vercel.app/api/admin/orders


export const getOrdersAdmin = async (token) => {
    return await axios.get("https://ecom-api-snowy.vercel.app/api/admin/orders", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeOrderStatus = async (token, orderId, orderStatus) => {
    return await axios.put("https://ecom-api-snowy.vercel.app/api/admin/order-status", {
        orderId,
        orderStatus,
    },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const getListAlluser = async (token) => {
    return await axios.get("https://ecom-api-snowy.vercel.app/api/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const ChangeUserStatus = async (token,value) => {
    return await axios.post("https://ecom-api-snowy.vercel.app/api/change-status",value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const ChangeUserRole = async (token,value) => {
    return await axios.post("https://ecom-api-snowy.vercel.app/api/change-role",value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}