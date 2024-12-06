import React, { useState } from "react";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/Ecom-store";
import { numberFormat } from "../utils/number";
import { useNavigate } from "react-router-dom";

import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "../stripe.css"
import { toast } from "react-toastify";


export default function CheckoutForm({dpmCheckerLink}) {
  const clearCart = useEcomStore((state) => state.clearCart);
  const token = useEcomStore((state)=>state.token)

  const navigate = useNavigate(); 

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
     
        // Make sure to change this to your payment completion page
        //return_url: "http://localhost:3000/complete",
        redirect:"if_required"
    
    });

    console.log("payload",payload)
    if(payload.error){
        setMessage(payload.error.message);
        console.log("error")
        toast.error(payload.error.message);
    }else if(payload.paymentIntent.status === "succeeded"){
      console.log("Ready or Saveorder")
       saveOrder(token,payload)
        .then((res)=>{
            console.log(res)
            clearCart()
            toast.success("Payment Success");
            navigate("/user/history");
        })
        .catch((err)=>{
            console.log(err)
        })    
    }else{
      console.log("Something wrong")
      toast.warning("Payment Failed")
       
    }



    setIsLoading(false);
  }

  const paymentElementOptions = {
    layout: "accordion"
  }

  

  return (
    <>
      <form
      id="payment-form" 
      className="space-y-6"
      onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button 
        className="stripe-button"
        disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
          <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Preview payment methods by transaction</a>
        </p>
      </div>
    </>
  );
}