import React, { useContext, useState } from 'react';

import app from './firebaseConfig';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,  updateProfile } from "firebase/auth";
import { userContext } from '../../App';

import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [newUser,setNewUser]=useState(false);
    const [user,setUser]=useState({
        isSignedIn:false,
        name:"",
        email:"",
        password:""
       
       
       
    })

    const [loggedInUser,setLoggedInUser]=useContext(userContext);

   const history = useNavigate();//useHistory()'r jaygay useNavigate() boshbe update react-6 (react router dom ) ah
   const location = useLocation();
   const { from } = location.state || { from: { pathname: "/" } };
    const provider = new GoogleAuthProvider();
    
    const handleGoogleSignIn = ()=>{
       //google at firebase  
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
                email:"",
                
                error:"",
                success:false
               
            };
            setUser(signedOutUser);
          
        }).catch((error) => {
          // An error happened.
        });
    }
    const handleBlur=(e)=>{
        //console.log(e.target.name,e.target.value);
        //debugger;
        let isFormValid=true;
        if(e.target.name==="email"){
            isFormValid= /(.+)@(.+){2,}\.(.+){2,}/.test(e.target.value);

        }
        if(e.target.name==="password"){
            const passwordValid=e.target.value.length>6;
            const passwordNumberType= /\d{1}/.test(e.target.value);
            isFormValid=passwordValid && passwordNumberType ;//7 tah number dile valid hobe
            
        }
        if(isFormValid){
            const newUserInfo={...user};//newUserInfo teh aager shob user er info gula chole gese
            newUserInfo[e.target.name]=e.target.value;
            setUser(newUserInfo);
            //console.log(newUserInfo);
        }
    }
    
    const handleSubmit=(e)=>{
        
        
       
        if(newUser && user.email && user.password){
           
            //password authentication at firebase

            const auth = getAuth(app);
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
               const newUserInfo={...user};
               newUserInfo.error="";
               newUserInfo.success=true;
               setUser(newUserInfo);
               updateUserName(user.name);
            })
            .catch((error) => {

                const newUserInfo= {...user};
               newUserInfo.error=error.message;
               newUserInfo.success=false;
               setUser(newUserInfo);
                
                // ..
            });

        }
        if(!newUser && user.email && user.password){
           
            
            //password authentication at firebase

            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
                const newUserInfo={...user};
               newUserInfo.error="";
               newUserInfo.success=true;
               setUser(newUserInfo);
               setLoggedInUser(newUserInfo);
               history.replace(from);
               console.log("user name info",res.user);

            })
            .catch((error) => {
                const newUserInfo= {...user};
                newUserInfo.error=error.message;
                newUserInfo.success=false;
                setUser(newUserInfo);
                 
            });

        }
     e.preventDefault();//page submit korle reload kore page..shetai prevent kore ei function
    }

    const updateUserName=(name)=>{
        //manage users at firebase
        
        const auth = getAuth(app);
        updateProfile(auth.currentUser, {
        displayName:name
        })
        .then(() => {
        console.log("User Name Updated Successfully");
        // ...
        }).catch((error) => {
         console.log(error);
        });

    }

    return (
        <div style={{textAlign: "center"}}>
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

           <div>
           <p>Our Own Authentication</p>
           <form onSubmit={handleSubmit}>
            <input type="checkbox" name="newUser" onChange={()=>{setNewUser(!newUser)}} id="" />
            <label htmlFor="newUser">New User Sign up</label>
            <br />
            {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name"required/>}
           <br/>
            <input type="text"name="email" onBlur={handleBlur} placeholder='Your Email Address' required />
            <br/>
            <input type="password" name="password"onBlur={handleBlur} placeholder="Your Password" required />
            <br/>
            <input type="submit" value={newUser ? "SIgn Up":"Sign In"} />
           </form>
          
           <p style={{color:'red'}}>{user.error}</p>
            {
                user.success && <p style={{color:'green'}}>User {newUser ? "Created" : "Logged In"} Successfully</p>
            }
           
           
           </div>

        </div>

        
    );
};

export default Login;