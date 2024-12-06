import React from 'react'
import moment from 'moment'
import { div } from 'framer-motion/client'


const Footer = () => {
    let year = moment().format("YYYY")
  return (
    
   
    <div className='bg-blue-500  text-gray-200 font-light text-center  mt-4  p-4 '>
        <p className='text-sm'> Copyright ©{year} All rights reserved </p>
    </div>
   
  )
}

export default Footer