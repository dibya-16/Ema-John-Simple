import React, { useContext } from 'react';
import {useForm} from "react-hook-form";
import { userContext } from '../../App';
import "./Shipment.css";
import { clearLocalShoppingCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser,setLoggedInUser]=useContext(userContext);
    const onSubmit = data => {
        console.log("form submitted",data);
        const savedCart=getDatabaseCart();
        const orderDetails={...loggedInUser,products:savedCart,shipment:data,orderTime:new Date()}
        fetch("http://localhost:5000/addOrder",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(orderDetails)
            })
            .then(res => res.json())
            .then(data =>{
              if(data){
                clearLocalShoppingCart();
                alert ("your oder placed successfully");
              }
            }
              ) 

        
    }
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
      
        <input name="name" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
        {errors.name && <span className="error">Your name is required</span>}
        <input name="email" defaultValue={loggedInUser.email} {...register("email", { required: true })}  placeholder="Your Email"/>
        {errors.name && <span className="error">Your email is required</span>}
        <input name="address" {...register("address", { required: true })} placeholder="Your Address" />
        {errors.name && <span className="error">This address is required</span>}
        <input name="phoneNumber" {...register("phoneNumber", { required: true })} placeholder="Your Phone Number" />
        {errors.name && <span className="error">This phone number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;