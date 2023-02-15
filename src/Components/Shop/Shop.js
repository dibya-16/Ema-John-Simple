import React, { useState } from 'react';
import fakeData from "../../fakeData";
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
import { addToDatabaseCart } from '../../utilities/databaseManager';


const Shop = () => {
    const first10=fakeData.slice(0,10);
    const [products,setProducts]= useState(first10);
    const [cart,setCart]=useState([]);
    const handleAddProduct = (produt) =>{
          console.log(produt);
          const newCart=[...cart,produt];//...cart means aager cart gula thakbe then ","produt(which is parameter product.js er button click korle receive kortese) dile porer gulao ashbe
          setCart(newCart);
          const sameProduct=newCart.filter(pd=>pd.key===produt.key);
          const count=sameProduct.length;
          addToDatabaseCart(produt.key,count);
          
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                
                    {
                       products.map(pd=> <Product handleAdd={handleAddProduct} product={pd}></Product>)
                    }
              
               
            </div>
            <div className="cart-container">
                <Cart carts={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;
