
import './App.css';


import {
  BrowserRouter as Router,

  Routes,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';

import Shop from './Components/Shop/Shop';
import Review from './Components/Review/Review';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Inventory from './Components/Inventory/Inventory';


//if you want to import something <(foldername) then tab or enter

export const userContext=createContext();

function App() {
  const [loggedInUser,setLoggedInUser]=useState({});//object take
 
  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
      


        
        <Router>
        <Header></Header>
           <Routes>
           <Route path="/shop" element={<Shop/>}>
              
             
              </Route>
              <Route path="/product/:productKey" element= {<ProductDetail/>}>
                
               
                </Route>
              <Route path="/review" element= {<Review/>}>
                
               
                </Route>
                 {/*<Route path="/shipment" element={<PrivateRoute><Shipment/></PrivateRoute>}>
                
                  </Route> */}
                
                
                <Route path="/shipment" element={<Shipment/>}>
                
                </Route>
                <Route path="/manage" element={<Inventory/>}>

                </Route>

               
             
              <Route exact path="/" element={<Shop/>}>
                
              </Route>
              <Route path="/login"element={<Login/>}>

              </Route>

           </Routes>
           
            
            
           
         
        </Router>
    
    </userContext.Provider>
  );
}

export default App;
