import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios'
import { z } from 'zod'
import zxcvbn from 'zxcvbn';
import { zodResolver } from '@hookform/resolvers/zod';


const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email !!! " }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmPassword"],
})



const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
  const [passwordScore, setPasswordScore] = useState(0);

  // const [form,setFrom] = useState({
  //   email:"",
  //   password:"",
  //   confirmPassword:""
  // })



  const handleOnchange = (e) => {
    setFrom({
      ...form,
      [e.target.name]: e.target.value
      // console.log(e.target.value, e.target.name)
    })

  }

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : "").score
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  console.log(passwordScore)
  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score
    // console.log(passwordScore)
    // if (passwordScore < 3) {
    //   toast.warning("Password is weak !!")
    //   return
    // }
    // console.log(" Password Strong")
    try {
      const res = await axios.post("https://ecom-api-snowy.vercel.app/api/register", data)
      console.log(res.data)
      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  };
  // const tam = Array.from(Array(5))
  // console.log(tam)


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200 px-4'>

      <div className='w-full shadow-md bg-white p-8 max-w-md'>
        <h1 className='text-2xl font-bold text-center my-4 '>
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='space-y-4'>

            <div>
              <input {...register("email")}
                placeholder='Email'
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 foucus:ring-blue-600
              focus:border-transparent
               ${errors.email && "border-red-500"}     `}
              />
              {errors.email &&
                <p className='text-red-500 text-sm'>
                  {errors.email.message}
                </p>}
            </div>




            <div>

              <input {...register("password")}
              type='password'
                placeholder='Password'
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 foucus:ring-blue-600
              focus:border-transparent 
               ${errors.email && "border-red-500"}     `}
              />
              {errors.password &&
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>}

              {
                watch().password?.length > 0 && <div className='flex mt-2'>
                  {
                    Array.from(Array(8).keys()).map((item, index) =>
                      <span className='w-1/5 px-1 ' key={index}>
                        <div className={`h-2 rounded ${passwordScore <= 2
                          ? "bg-red-500"
                          : passwordScore < 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          }`}>


                        </div>
                      </span>
                    )
                  }
                </div>
              }
            </div>

            <div>

              <input {...register("confirmPassword")}
              type='password'
                placeholder='Confirm Password'
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 foucus:ring-blue-600
                focus:border-transparent
                 ${errors.email && "border-red-500"}     `}
              />
              {errors.confirmPassword &&
                <p className='text-red-500 text-sm'>
                  {errors.confirmPassword.message}
                </p>}
            </div>
            <button className='bg-blue-600 rounded-md p-2 w-full text-white font-bold shadow-md
            hover:bg-blue-7004'>Register</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register