import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { db } from "../firebase";
export default function Auth() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider(); // google auth provider object for google auth
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // check if user authorized with Google already exists in DB
      const checkUserAgainstDB = doc(db, "users", user.uid); // gets a document reference , for us , we get the user uid from collection "users" in our db
      const docSnap = await getDoc(checkUserAgainstDB);
      if(!docSnap.exists()) {
        await setDoc(checkUserAgainstDB, { // setdoc puts our user in DB with the UID from checkUserAgainstDB and name and emial, also if the user does not exist, it creates one
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      } 
      navigate('/');
      toast.success("You Signed Up with Google!")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button type = 'button' onClick={ onGoogleClick } className="flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded">
      <FcGoogle className="text-xl bg-white rounded-full mr-2"/>
      Continue with Google
    </button>
  );
}
