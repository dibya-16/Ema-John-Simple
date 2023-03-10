import React, { useEffect, useState } from 'react';
import fakeData from "../../fakeData";
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10=fakeData.slice(0,10);
    const [products,setProducts]= useState(first10);
    const [cart,setCart]=useState([]);

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
       
            const previousCart =  productKeys.map( existKey => {
                const product = fakeData.find( pd => pd.key === existKey);
                product.quantity = savedCart[existKey];
                //console.log(savedCart);
                //console.log(existKey,savedCart[existKey]);////console ah jeye eta dekhlei bujha jaabr ..jodi ekhane nah bujhi
                //console.log(productKeys);
                return product;
            });
            setCart(previousCart);
        
        
    }, []);

    const handleAddProduct = (produt) =>{
          //console.log(produt);
          const sameProduct=cart.find(pd=>pd.key===produt.key);
          let count =1;
          let newCart;
          if(sameProduct){
            count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others=cart.filter(pd=>pd.key!==produt.key);
            newCart=[...others,sameProduct];
          }
          else{
            produt.quantity=1;
            newCart=[...cart,produt];//...cart means aager cart gula thakbe then ","produt(which is parameter product.js er button click korle receive kortese) dile porer gulao ashbe
         
            
          }
          //const count=sameProduct.length;
          setCart(newCart);
         
         
          addToDatabaseCart(produt.key,count);
          
    }
    return (
        <div className='twin-container'>
            <div className="products-container">
                
                    {
                       products.map(pd=> <Product handleAdd={handleAddProduct} product={pd}></Product>)
                    }
              
               
            </div>
            <div className="cart-container">
                <Cart carts={cart}>
                    <Link to="/review">
                          <button className="reviewButton">Review Your Order</button>
                    </Link>
           
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;
