import React from 'react';
import "./Product.css"

const Product = (props) => {
    const {name,img,price,seller,stock}=props.product;
    return (
        <div className="product">
            <div className="">
                <img src={img} alt="" />

            </div>
            <div className="">
                <h3 className="product-name">{name}</h3>
                <br/>
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button onClick={()=>props.handleAdd(props.product)} className="main-button">Add to Cart</button>
                 
            </div>
        </div>
    );
};

export default Product;