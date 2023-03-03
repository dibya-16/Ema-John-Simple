import React, { useContext, useState } from 'react';

import app from './firebaseConfig';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
//import { userContext } from '../App';
//import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [user,setUser]=useState({
        isSignedIn:false,
        name:"",
        email:""
    })

    //const [loggedInUser,setLoggedInUser]=useContext(userContext);
   // const history = useNavigate();//useHistory()'r jaygay useNavigate() boshbe update react-6 (react router dom ) ah
  //const location = useLocation();
  //const { from } = location.state || { from: { pathname: "/" } };
    const provider = new GoogleAuthProvider();
    
    const handleGoogleSignIn = ()=>{
        
        const auth = getAuth(app);
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const {displayName,email} = result.user;
    const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email
    };
    setUser(signedInUser);

    //setLoggedInUser(signedInUser);
    //history.replace(from);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    }

    const handleGoogleSignOut=()=>{
        const auth = getAuth(app);
        signOut(auth).then((res) => {
            const signedOutUser={
                isSignedIn:false,
                name:"",
                email:""
            };
            setUser(signedOutUser);
          
        }).catch((error) => {
          // An error happened.
        });
    }
    return (
        <div>
            {
               user.isSignedIn?<button onClick={handleGoogleSignOut}>Sign Out</button>:
               <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            }
           
            {
                user.isSignedIn &&<div>
                    <p>Welcome,{user.name}</p>
                    <p>Your email:{user.email}</p>
                </div> 
            }
        </div>
    );
};

export default Login;