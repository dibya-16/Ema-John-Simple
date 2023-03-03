import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
/* import { useState } from 'react';
import { useEffect } from 'react'; */

const ProductDetail = () => {
    const {productKey} = useParams();//here product key name got from app.js file in productDetail url
    /* const [product, setProduct] = useState(null);
    
    useEffect(() =>{
        fetch('http://localhost:4200/product/'+ productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    }, [productKey]); */ 
    const product = fakeData.find(pd=>pd.key===productKey);
    
    
    return (
        <div>
            <h1>Your Product Details.</h1>
            {
                 <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;