import React,{useEffect} from "react";
import { signOut } from "firebase/auth";
import { auth } from "./utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from './utils/userSlice'
import { LOGO } from "./utils/Constant";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
const dispatch = useDispatch()


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");
      })
      .catch((error) => {
        // An error happened.
        // navigate("/error");
      });
  };


  useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
       navigate("/browse")
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser())
        navigate("/")
      
      }
    });

    // unsubscribe when my component will unmount
    return ()=>unsubscribe()
  },[])

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-[7rem]"
        src={LOGO}
        alt="photo"
      />
      {user && <div className="flex p-2  ">
        <img
          className="w-8 h-8 rounded-[4px] mt-1"
          src={user.photoURL}alt="usericon"
        />
        <img
          className="w-8 h-8 rounded-[4px] mt-1"
          src="https://occ-0-4409-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
          alt="usericon"
        />
        <button className="p-2 text-white font-medium" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>}
    </div>
  );
};

export default Header;
