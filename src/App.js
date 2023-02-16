
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


function App() {
 
  return (
    <div>
      
<Header></Header>
        
        <Router>
           <Routes>
           <Route path="/shop" element={<Shop/>}>
              
             
              </Route>
              <Route path="/product/:productKey" element= {<ProductDetail/>}>
                
               
                </Route>
              <Route path="/review" element= {<Review/>}>
                
               
                </Route>
             
              <Route exact path="/" element={<Shop/>}>
                
              </Route>

           </Routes>
           
            
            
           
         
        </Router>
    
    </div>
  );
}

export default App;
