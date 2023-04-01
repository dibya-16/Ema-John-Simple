import React, { useEffect, useState } from 'react';
//import fakeData from '../../fakeData';
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';

import { useNavigate } from 'react-router-dom';






const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const history=useNavigate();
    //const handlePlaceOrder=()=>{
      //  setCart([]);
        //setOrderPlaced(true);
        //clearLocalShoppingCart();
    //}

    const handleProceedOrder=()=>{
        history("/shipment");
    }
    const removeItem =(productKey)=>{
        //console.log("removed",productKey);
        const newCart=cart.filter(pd=>pd.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }
   

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch("http://localhost:5000/productsByKeys",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data =>setCart(data))
            /*const cartProducts =  productKeys.map( key => {
                const product = fakeData.find( pd => pd.key === key);
                product.quantity = savedCart[key];
                //console.log(savedCart);
                //console.log(key,savedCart[key]);//console ah jeye eta dekhlei bujha jaabr ..jodi ekhane nah bujhi
                //console.log(productKeys);
                return product;
            });
            setCart(cartProducts);
        */
        
        
    }, []);
    let thankYou;
    if(orderPlaced){
        thankYou=<img src={happyImg} alt=""/>    }

     
    return (

        <div className='twin-container'>
        <div className="products-container">
            
                {
                    cart.map(pd => <ReviewItem 
                        key={pd.key}
                        removeItem={removeItem}
                        product={pd}></ReviewItem>)
                }
          
           {
            thankYou
           }
        </div>
        <div className="cart-container">
            <Cart carts={cart}>
           
                          <button className="reviewButton"onClick={handleProceedOrder}>Proceed CheckOut</button>
                   
            </Cart>
        </div>
        
    </div>
      
           
    );
}

export default Review;