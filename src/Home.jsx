import React, { useEffect, useState } from 'react'
import { auth } from './config/Firebase-config'
import { useNavigate } from 'react-router-dom';
import { CirclesWithBar} from 'react-loader-spinner';
import { EmailAuthProvider, getAuth, isSignInWithEmailLink, linkWithCredential, signInWithEmailLink, signOut } from 'firebase/auth';

function Home() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [number,setNumber]=useState('')
    const [creationTime,setCreationTime]=useState('')
    const [photoURL,setphotoURL]=useState('')
    const [loader,setloader]=useState(true)
    const Navigate=useNavigate();
    const Getdata=()=>{

        setloader(true)
        setTimeout(()=>{
             const auth = getAuth();
             const user = auth.currentUser;
             
            if(user){
              
             
               console.log('here ia am',user)
          
                setNumber(user?.phoneNumber)
                setName(user?.displayName)
                setEmail(user?.email)
                setCreationTime(user?.metadata?.creationTime)
                setphotoURL(user?.photoURL)
               
      
            
             
            }
            else if(isSignInWithEmailLink(auth, window.location.href)){
                // now in case user clicks the email link on a different device, we will ask for email confirmation
                let email = localStorage.getItem('email');
                console.log('email',email)
                if(!email){
                    Navigate('/');

                }
                // after that we will complete the login process
                setloader(true);
                signInWithEmailLink(auth, localStorage.getItem('email'), window.location.href)
                .then((result)=>{
                    let user_data=result.user
                // we can get the user from result.user but no need in this case
                console.log(user_data.user);
                setName(user_data?.displayName)
                setEmail(user_data?.email)
                setCreationTime(user_data?.metadata.creationTime)
                setphotoURL(user_data?.photoURL)
                setloader(false);
                }).catch((err)=>{
                setloader(false);
                const credential = EmailAuthProvider.credentialWithLink(
                    email, window.location.href);
                  
                  // Link the credential to the current user.
                  const auth = getAuth();
                  linkWithCredential(auth.currentUser, credential)
                    .then((usercred) => {
                      console.log('usercred',usercred)
                    })
                    .catch((error) => {
                      // Some error occurred.
                      console.log('error',error)
                      Navigate('/')
                    });
              
                })
            
            }
            else{
                Navigate('/');
            }
            setloader(false)

        }, 700 )
    }
    useEffect(()=>{
        Getdata()
        },[])
        const signOutFunc = () => {
            signOut(auth).then((res) => {
                localStorage.clear()
              Navigate('/') 
            })
            .catch((err) => {
              console.log(err);
            });
          };

   

  return (
    <React.Fragment>{        
        loader?<div style={{marginTop:'33vh',textAlign:'center'}}>
                <CirclesWithBar
            height="150"
            width="150"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass="justify-content-md-center"
            visible={true}
            outerCircleColor="white"
            innerCircleColor="white"
            barColor="white"
            ariaLabel='circles-with-bar-loading'
            />
        </div>:<>
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
         <div className="card p-4">
        <div className=" image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary"> <img src={photoURL != ""?photoURL:"https://i.imgur.com/wvxPV9S.png"} height="100" width="100" /></button>
            <span className="name mt-3">{name}</span> <span className="idd">{email}</span>
            <span className="idd">{number}</span>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2"></div>
                <div className=" px-2 rounded mt-4 date "> <span className="join">{creationTime}</span> </div>
          
      
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span>
                <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div>
            <div className=" d-flex mt-2"> <button className="btn1 btn-dark" onClick={()=>{signOutFunc()}}>Logout</button> </div>

        </div>
    </div>
         </div>
        
        </>
        }
        
    </React.Fragment>
  )
}

export default Home
