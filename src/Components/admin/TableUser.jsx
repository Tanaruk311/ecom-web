import React, { useEffect, useState } from 'react'
import { ChangeUserRole, getListAlluser } from '../../api/admin'
import useEcomStore from '../../store/Ecom-store'
import { dateFormat } from '../../utils/dateformat'
import { ChangeUserStatus } from '../../api/admin'
import { toast } from 'react-toastify'

const TableUser = () => {
    const token = useEcomStore((state) => state.token)
    const [users, setUsers] = useState([])


    useEffect(() => {
        handleGetUsers(token)
    }, [])

    const handleGetUsers = (token) => {
        getListAlluser(token)
            .then((res) => {
                console.log(res)
                setUsers(res.data)

            })
            .catch((err) => console.log(err))
    }

    const handleChangUserStatus =  (userId,userStatus) =>{
        console.log(userId,userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
       ChangeUserStatus(token,value)
       .then((res)=>{
           console.log(res)
           handleGetUsers(token)
           toast.success("Update Status Success")
       })
       .catch(err=>console.log(err))
    }
    const handleChangeUserRole=  (userId,userRole) =>{
        console.log(userId,userRole)
        const value = {
            id: userId,
            role: userRole
        }
       ChangeUserRole(token,value)
       .then((res)=>{
           console.log(res)
           handleGetUsers(token)
           toast.success("Update Role Success")
       })
       .catch(err=>console.log(err))
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Email</th>
                        {/* <th>Last Date Edit</th> */}
                        <th> Right</th>
                        <th>Status</th>
                        <th>Manage</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users?.map((item,index)=>
                        <tr key={index} className='text-center'>
                        <td>{index+1}</td>
                        <td>{item.email}</td>
                        {/* <td>{dateFormat(item.updatedAt)}</td> */}
                        <td>

                         
                            <select 
                            onChange={(e)=>handleChangeUserRole(item.id,e.target.value)}
                            value={item.role}>
                                <option>user</option>
                                <option>admin</option>
                            </select>

                        </td>
                        <td>{item.enabled ? "Active  ": "Inactive"}</td>
                        <td>
                            <button
                            className='bg-yellow-500 p-1 rounded-md shadow-md text-white'
                            onClick={()=>handleChangUserStatus(item.id,item.enabled)}>
                            {item.enabled ? "Disable" : "Enable"}
                            </button>
                            </td>
                    </tr>
                        
                        )
                    }
                </tbody>

            </table>
        </div>
    )
}

export default TableUser