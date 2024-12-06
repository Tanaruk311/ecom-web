import axios from 'axios';
import React, { useState } from 'react';
import useEcomStore from '../../store/Ecom-store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user)
  console.log("user from zustand", user)
 

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role
      console.log("role", role)
      toast.success("Welcome Back");
      roleRedirect(role)

    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/product")
    } else {
      navigate(-1)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200 px-4'>
      <div className='w-full shadow-md bg-white p-8 max-w-md'>
      <h1 className='text-2xl font-bold text-center my-4 '>Login</h1>
        <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
      
            
            <input
              className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 foucus:ring-blue-600
              focus:border-transparent"
              placeholder='Email'
              name="email"
              type="email"
              onChange={handleOnChange}
            />
       

            <input
              className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 foucus:ring-blue-600
              focus:border-transparent"
              placeholder='Password'
              name="password"
              type="password"
              onChange={handleOnChange}
            />
   
          <button className='bg-blue-600 rounded-md p-2 w-full text-white font-bold shadow-md
            hover:bg-blue-7004'>Login</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
