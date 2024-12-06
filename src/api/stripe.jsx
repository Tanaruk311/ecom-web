import axios from "axios";

export const payment = async (token) => {
    return await axios.post("https://ecom-api-snowy.vercel.app/api/user/create-payment-intent", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}