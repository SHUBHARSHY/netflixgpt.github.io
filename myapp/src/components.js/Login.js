import React, { useRef, useState } from "react";
import './Login.css'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import { checkValidData } from "./utils/Validate";
import { auth } from "./utils/Firebase";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { USER_AVATAR } from "./utils/Constant";



const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  // const navigate = useNavigate()
  const Email = useRef(null);
  const Password = useRef(null);
  const Name = useRef(null);
  const dispatch = useDispatch()



  const toggleSingInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //validate the form
    const newEmail = Email.current.value;
    const newPassword = Password.current.value;
    // const newName = Name.current.value
    const message = checkValidData(newEmail, newPassword);
    setErrMessage(message);
    console.log(message )

    // sign in : sign up
    if (message) return;

    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(auth, newEmail, newPassword)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            // displayName:newName , 
            photoURL: USER_AVATAR
          }).then(() => {
            // Profile updated!
            const {uid, email, displayName,photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
            setErrMessage(error.message)
          });

          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(auth, newEmail, newPassword)
        .then((userCredential) => {
          // Signed in
          const Newuser = userCredential.user;
          // console.log(Newuser);
          // navigate("/browse")
          // ...
        })
        .catch((error) => {
          console.log(error);
          let errorCode = error.code;
          errorCode = "User not found.";
          let errorMessage = error.message;
          errorMessage = " Please Sign-up if you are a new user";
          setErrMessage(errorCode + `\t` + errorMessage);
        });
    }
  };
  // console.log(isSignInForm);
  return (
    <div>
      <Header />
      <div className="absolute bg-color">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="photo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black bg-opacity-75 my-36 mx-auto right-0 left-0 text-white rounded-[4px]"
      >
        <h1 className="font-bold text-3xl py-4">
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={Name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-[#333] rounded-[4px]"
          />
        )}
        <input
          ref={Email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-[#333] rounded-[4px]"
        />
        <input
          ref={Password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-[#333] rounded-[4px] "
        />
        <button
          className="p-4 my-6 bg-[#e50914] w-full rounded-[4px] cursor-pointer"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-[#e50914] font-medium text-lg py-2">
         { /*{!isSignInForm ? errMessage : null}*/}
         {errMessage}
        </p>
        <div className="py-4 cursor-pointer" onClick={toggleSingInForm}>
          {isSignInForm ? (
            <p>
              <span className="text-[#737373]">New to Netflix?</span> Sign Up
              Now
            </p>
          ) : (
            <p>
              {" "}
              <span className="text-[#737373]">Alredy registerd?</span> Sign In
              Now
            </p>
          )}{" "}
        </div>
      </form>
    </div>
  );
};
export default Login;
