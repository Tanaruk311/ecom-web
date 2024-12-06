import React from 'react'
import { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const LoadingToRedirect = () => {

    const [count, setCount] = useState(5);
    const [redirect, setRedirect] = useState(false);

    useEffect(()=> {
        const interval = setInterval(()=>{
            setCount((currentCount)=>{
                if(currentCount === 1 ) {
                    clearInterval(interval);
                    setRedirect(true);
                }
                return currentCount - 1 //ค่าปัจจุบัน -1 = 3 2 1
            })
     
        },1000) // ทุกๆ 1 วินาที

        return() => clearInterval(interval);
    },[]) //[] กัน infinite loop
    if (redirect) {
        return <Navigate to={"/"} />
    }

  return (
    <div>No Permission, Redireact in {count} </div>
  )
}

export default LoadingToRedirect