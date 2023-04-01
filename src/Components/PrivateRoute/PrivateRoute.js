import React, { useContext } from 'react';
import { Route, Navigate, Routes} from 'react-router-dom';
import { userContext } from '../../App';

  const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser,setLoggedInUser]=useContext(userContext);
    return (
       // loggedInUser.email ? <Outlet/> :<Navigate to ="/login"/>
        
            <Routes>
                 <Route
              {...rest}
              render={({ location }) =>
              loggedInUser.email ? (
                  children
                ) : (
                  <Navigate
                    to={{
                      pathname: "/login",
                      state: { from: location }
                    }}
                  />
                )
              }
            />
            </Routes>
           
            
          
        
    );
};

export default PrivateRoute;