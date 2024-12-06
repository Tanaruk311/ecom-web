import axios from 'axios';  // เพิ่มบรรทัดนี้เพื่อ import axios

export const currentUser = async (token) => await axios.post('https://ecom-api-snowy.vercel.app/api/current-user', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = async (token) => {
    return await axios.post('https://ecom-api-snowy.vercel.app/api/current-admin', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
