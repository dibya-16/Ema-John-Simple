import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const handlePlaceOrder=()=>{
        setCart([]);
        setOrderPlaced(true);
        clearLocalShoppingCart();
    }
    const removeItem =(productKey)=>{
        console.log("removed",productKey);
        const newCart=cart.filter(pd=>pd.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }
   

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
       
            const cartProducts =  productKeys.map( key => {
                const product = fakeData.find( pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
        
        
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
           
                          <button className="reviewButton"onClick={handlePlaceOrder}>Place Order</button>
                   
            </Cart>
        </div>
        
    </div>
      
           
    );
};

export default Review;