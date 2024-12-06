import React from 'react'
import { useState,useEffect } from 'react'
import useEcomStore from '../store/Ecom-store';
import { currentAdmin } from '../api/auth';
import LoadingToRedirect from './LoadingToRedirect';


const ProtectRouteAdmin = ({element}) => {
    const [ok, setOk] = useState(null);
    const user = useEcomStore((state)=>state.user)
    const token = useEcomStore((state)=>state.token)
  

    useEffect(()=>{
      if(user && token){
        // send to backend
       
         currentAdmin(token)
         .then((res)=>setOk(true))
         .catch((err)=>setOk(false))
   //     .then((res) => {
//           console.log("currentAdmin response:", res.data);
//           if (res.data.role === "admin") {
//               console.log("Setting ok state to true");
//               setOk(true); // อัปเดตสถานะ
//           } else {
//               console.log("Role is not admin, setting ok state to false");
//               setOk(false);
//           }
//       })
//       .catch((err) => {
//           console.error("currentAdmin error:", err);
//           setOk(false);
//       });
// } else {
//   console.log("No user or token found, setting ok state to false");
//   setOk(false);
// }
// }, [user, token]);

// ตรวจสอบการเปลี่ยนแปลง ok state
// useEffect(() => {
// console.log("ok state changed:", ok);
// }, [ok]);
  
      }
    },[])
  

  return ok ?  element : <LoadingToRedirect />
    
  
}

export default ProtectRouteAdmin