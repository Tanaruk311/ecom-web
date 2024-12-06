import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../Components/MainNav'
import Footer from '../Components/Home/Footer'


const Layout = () => {
  return (
    <div>
       <MainNav />
        <main className='h-full px-4 my-2 mx-auto'>
        <Outlet />
        </main>
        <Footer />
       
       
    </div>
  )
}
export default Layout