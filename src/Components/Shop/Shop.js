import React, { useEffect, useState } from 'react';
//import fakeData from "../../fakeData";
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
//(rsc+enter) basic template chole ashbe react er
const Shop = () => {
    //const first10=fakeData.slice(0,10);
    //const [products,setProducts]= useState(first10);
    const [products,setProducts]= useState([]);
    const [cart,setCart]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/products")
        .then(res=>res.json())
        .then(data=>setProducts(data))

    },[])

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
            .then(data =>
                setCart(data))    

             /*  if(products.length>0){
                const previousCart =  productKeys.map( existKey => {
                const product = products.find( pd => pd.key === existKey);
                product.quantity = savedCart[existKey];
                //console.log(savedCart);
                //console.log(existKey,savedCart[existKey]);////console ah jeye eta dekhlei bujha jaabr ..jodi ekhane nah bujhi
                //console.log(productKeys);
                return product;
            });
            setCart(previousCart);

               }*/
               
           
        
        
    }, []);

    const handleAddProduct = (produt) =>{
          //console.log(produt);
          const sameProduct=cart.find(pd=>pd.key===produt.key);//find element ber kore
          let count =1;
          let newCart;
          if(sameProduct){
            count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others=cart.filter(pd=>pd.key!==produt.key);//filter array ber kore
            newCart=[...others,sameProduct];//sameproduct nisi...cz ekhane same product j create korsi..oitar quantity tah new cart ah newar jonno eta nisi
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
