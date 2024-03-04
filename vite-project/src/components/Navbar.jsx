import React from 'react'
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import {Link, useNavigate} from 'react-router-dom';



const Navbar = () => {

  const auth = getAuth();

  const navigate = useNavigate();

  const googleClick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // console.log(result.user);
    const user = result.user;
    //check for user 
    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        timestamp: serverTimestamp()
      })
    }

    navigate('/profile')
  };

  // console.log(auth)


  const logOut = async () => { 
    await auth.signOut() 
    navigate('/')
   };

  return (
    <>
      <div className="nav_bar sticky-top">
        <Link to={'/'} className="left">
          {auth.currentUser ? (
            <>
              <img src={auth?.currentUser?.photoURL} alt="" />
              <h3>{auth?.currentUser?.displayName}</h3>
            </>
          ) : (
            <h2>Social Media App</h2>
          )}
        </Link>
        <div className="right">
        <button onClick={googleClick} className='btn btn-warning mx-3'>Login With Google</button>
          <Link to={"/post"} className='btn btn-warning mx-3'>Post</Link>
          <Link to={"/profile"} className='btn btn-warning mx-3'>Profile</Link>
          <Link to={"/users"} className='btn btn-warning mx-3'>All Users</Link>
          <button onClick={logOut} className='btn btn-warning mx-3'>LogOut</button>
        </div>
      </div> 


    </>

  )
}

export default Navbar