import React from 'react';
import { useParams } from 'react-router-dom';
//import fakeData from '../../fakeData';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams();//here product key name got from app.js file in productDetail url
    const [products, setProducts] = useState({});
    
    useEffect(() =>{
        fetch('http://localhost:5000/products/'+ productKey)
        .then(res => res.json())
        .then(data =>setProducts(data))
    }, [productKey]);//[productKey] here product key dependency hishabe kaj kortese.means product key change hole update korbe
       
    //const product = fakeData.find(pd=>pd.key===productKey);
    
    
    return (
        <div>
            <h1>Your Product Details.</h1>
            {
                 <Product showAddToCart={false} product={products}></Product>
            }
        </div>
    );
};

export default ProductDetail;