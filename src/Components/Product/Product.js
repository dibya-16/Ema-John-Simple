import React from 'react';
import { Link } from 'react-router-dom';
import "./Product.css"

const Product = (props) => {
    const {name,img,price,seller,stock,key}=props.product;
    return (
        <div className="product">
            <div className="">
                <img src={img} alt="" />

            </div>
            <div className="">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddToCart === true && <button 
                    className="main-button" 
                    onClick={() => props.handleAdd(props.product)}
                    >Add to Cart
                      
                    </button>}
                
                 
            </div>
        </div>
    );
};

export default Product;