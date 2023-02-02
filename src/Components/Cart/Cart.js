import React from 'react';

const Cart = (props) => {
    const cartAll = props.carts;
    //const total =cartAll.reduce((total,prd)=>total+prd.price,0) eibhabeu total kora jaay
    let total=0;
    for(let i=0;i<cartAll.length;i++){
        const productAll=cartAll[i];
        total=total+productAll.price; 
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

   
    return (
        <div>
            <h3>Order Summary:</h3>
            <h4>Items Ordered:{cartAll.length}</h4>
            <h4>Product Price:{total}</h4>
            <h4>Shipping Cost:{shippingCost}</h4>
            <h4>Tax+Vat:{tax}</h4>
            <h4>Total Price:{grandTotal}</h4>
            
        </div>
    );
};

export default Cart;