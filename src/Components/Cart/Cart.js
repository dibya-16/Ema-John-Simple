import React from 'react';

import "./Cart.css";

const Cart = (props) => {
    const cartAll = props.carts;
    //const total =cartAll.reduce((total,prd)=>total+prd.price,0) eibhabeu total kora jaay
    let total=0;
    for(let i=0;i<cartAll.length;i++){
        const productAll=cartAll[i];
        total=total+productAll.price*productAll.quantity||1; 
    }
    let shippingCost=0;
    if(total>30){
        shippingCost=0;

    }
    else if(total>15){
        shippingCost=4.23;
    }
    else if(total>0){
        shippingCost=15.49;

    }
    const tax=total/10;//meaning total er 10%
    
    const grandTotal=(total+shippingCost+tax).toFixed(2);
    const formatNumber=(num)=>{
        const precision=num.toFixed(2);//"toFixed(2)" value 2 decimal porjonto rakhe.but er por string hoye jaaay value
        return Number(precision);//"Number()"string to number ah convert koreh

    }
    return (
        <div className="cart">
            <h3>Order Summary</h3>
            <h4>Items Ordered:{cartAll.length}</h4>
            <h4>Product Price:{total}</h4>
            <h4>Shipping Cost:{shippingCost}</h4>
            <h4>Tax+Vat:{formatNumber(tax)}</h4>
            <h4>Total Price:{grandTotal}</h4>
            {
                props.children
            }
           
            
        </div>
    );
};

export default Cart;