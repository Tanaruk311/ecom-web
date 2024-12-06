import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, LogOut, SquareChartGantt } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { UserRoundPen } from 'lucide-react';
import { Logs } from 'lucide-react';



const SidebarAdmin = () => {
    return (
        <div className="bg-blue-800  w-64 text-white flex flex-col h-screen">
            <div className='h-24 bg-blue-900 flex items-center justify-center text-2xl font-bold'>
                Admin panel
            </div>
            <nav className='flex-1 px-4 py-4 space-y-2'>
                <NavLink to={"/admin"}
                    end
                    className={(isActive) => isActive ?
                        "bg-blue-900 text-white flex items-center gap-2 px-4 py-2 rounded-md"
                        : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
                    }>
                    <LayoutDashboard className='mr-2' />
                    Dashborad
                </NavLink>

                <NavLink to={"manage"}
                    className={(isActive) => isActive ?
                        "bg-blue-900 text-white flex items-center gap-2 px-4 py-2 rounded-md"
                        : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
                    }>
                    
                    <UserRoundPen className='mr-2' />
                    Manage
                </NavLink>
                <NavLink to={"category"}
                    className={(isActive) => isActive ?
                        "bg-blue-900 text-white flex items-center gap-2 px-4 py-2 rounded-md"
                        : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
                    }>
                    <SquareChartGantt className='mr-2' />
                    Category
                </NavLink>
                <NavLink to={"product"}
                    className={(isActive) => isActive ?
                        "bg-blue-900 text-white flex items-center gap-2 px-4 py-2 rounded-md"
                        : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
                    }>
                    
                    <ShoppingCart className='mr-2' />
                    Product
                </NavLink>

                <NavLink to={"orders"}
                    className={(isActive) => isActive ?
                        "bg-blue-900 text-white flex items-center gap-2 px-4 py-2 rounded-md"
                        : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
                    }>
                    <Logs className='mr-2' />
                  order
                </NavLink>
               
            </nav>

            <div>
            <NavLink 
                    className={(isActive) => isActive ?
                        "bg-blue-900 text-white flex items-center gap-2 px-4 py-2 rounded-md"
                        : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
                    }>
                    <LogOut className='mr-2' />
                    Logout
                </NavLink>
            </div>
        </div> 
    )
}

export default SidebarAdmin