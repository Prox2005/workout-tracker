import React, { useEffect } from "react";
import "./auth.css";
import { googleProvider, authInformation, db } from "../../config/firebase";
import { signInWithPopup, onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // checks if user is authenticated or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/workout-tracker");
    });
  }, []);

  //  will ask user to sign up and retrieve user's data with local storage
  const onSubmit = async () => {
    const results = await signInWithPopup(authInformation, googleProvider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
    };
    // local storage
    localStorage.setItem("auth", JSON.stringify(authInfo));
  };

  return (
    <div className="app__auth">
      <h1>Sign in With Google </h1>
      <button onClick={onSubmit}>Sign in With Google</button>
    </div>
  );
};

export default Auth;
