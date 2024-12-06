import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom"
import useEcomStore from '../store/Ecom-store'
import { ChevronDown } from 'lucide-react'
import Logo from '../assets/Logo.png'
import avatar from '../assets/avatar.jpg'

const MainNav = () => {
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const logout = useEcomStore((state) => state.logout)    
    //console.log(user)

    const [isOpen, setIsOpen] = useState(false)

    const toggleDropDown = () => {
        setIsOpen(!isOpen)
    }


    return (
        <nav className='bg-blue-600'>

            <div className=' mx-auto px-4'>

                <div className='flex justify-between h-24'>
                    <div className='flex items-center gap-6'>
                        <Link to={"/"} className='text-2xl font-bold'>
                            <img src={Logo}  className='w-24 h-24 object-cover background-center' />       
                        
                        </Link>
                        <NavLink

                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"

                            }


                            to={"/"}>
                            Home
                        </NavLink>



                        <NavLink

                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"

                            }

                            to={"/shop"}>
                            Shop</NavLink>
                        {/* badge */}
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium relative "
                                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200 relative"
                            }
                            to="/cart"
                        >
                            Cart
                            {carts.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 rounded-full px-2 text-white text-xs">
                                    {carts.length}
                                </span>
                            )}
                        </NavLink>

                    </div>
                        
                        {
                            user
                            ?  <div className='flex items-center gap-4'>
                            <button
                                onClick={toggleDropDown}
                                className='flex items-center gap-2 hover:bg-blue-600 px-2 py-3 rounded-md'>
                                <img
                                    className='w-8 h-8 rounded-full'
                                    src={avatar}/>
                                <ChevronDown />
                            </button>
                            {
                                isOpen && (
                                    <div className='absolute  mt-2 top-12 bg-white shadow-md z-50'>
                                        <Link className='block px-4 hover:bg-gray-200'>History</Link>
                                        <button
                                        onClick={()=>logout()}
                                        className='block px-4 hover:bg-gray-200'>Logout</button>
                                      
                                        </div>
                                )
                            }
    
                        </div>
                            :  <div className=' flex items-center gap-4'>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                                        : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
    
                                }
    
                                to={"/register"}>Register</NavLink>
    
    
    
    
                            <NavLink
    
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                                        : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
    
                                }
    
                                to={"/login"}>login</NavLink>
                        </div>
                        }

                   

                  
                </div>

            </div>
        </nav>
    )
}

export default MainNav