import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from '../SimpleCardForm/SimpleCardForm';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');//loadstripe er j  key boshabo sheta stripe ah account kholar por pawa jaabe

const PaymentProcess = () => {
    
    return (
       
   <Elements stripe={stripePromise} >
    <SimpleCardForm></SimpleCardForm>
      
    </Elements>
            
        
    );
};

export default PaymentProcess;