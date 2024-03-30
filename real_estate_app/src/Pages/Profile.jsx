import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import {toast} from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
const Profile = () => {
  const navigate = useNavigate();
  const [changeEdit, setChangeEdit] = useState(false); // this is for Edit button, work with states to display different messages, also for enable/disable the ability for users to write in the name input
  const auth = getAuth();
  const [formData, setFormData] = useState({ // controll the inputs
    name: '',
    email: ''
  });

  useEffect(() => {
    // Fetch user information after component mounts
    if (auth.currentUser) {
      setFormData({
        name: auth.currentUser.displayName || '', // Use displayName instead of name
        email: auth.currentUser.email || ''
      });
    }
  }, [auth.currentUser]);
  
  const {name, email } = formData // destructure
  function onLogout () { // logout functionality
    auth.signOut();
    navigate("/");
  }

  function onChange(e) {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.id]: e.target.value,

    }))

  }
  async function onSubmit() {
    try {
      if(auth.currentUser.displayName !== name) {
        //update display name in firebase db
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update name in firestore 
        const docRef = doc(db, "users", auth.currentUser.uid) // we make changes in the database using docref and doc from firestore and we display the "name" coming from the currentuser.displayname
        await updateDoc(docRef, {
          name,
        })
      }
      toast.success("Profile updated!")
    } catch (error) {
      toast.error("Could not update the profile details!")
    }
  }
  return (
    <> 
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>  
        <h1 className='text-3xl text-center mt-6 font-bold'>Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            { /* Name Input */ }
            
            <input type='text' id='name' value={name} disabled={!changeEdit} onChange = {onChange}className= {`mb-5 w-full px-3 py-2 text-xl text-gray-800 bg-white
             border border-gray-300 rounded transition ease-in-out ${changeEdit && "bg-red-200 focus:bg-red-200"}`} >  
              </input> 

            { /* Email input */ }

            <input type='email' id='email' value={email} disabled className='w-full px-3 py-2 text-xl text-gray-800 bg-white border border-gray-300 rounded transition ease-in-out'></input>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='flex items-center mb-6'>Do you want to change your name ?
                <span
                onClick={() => {changeEdit && onSubmit();  // with onSubmit we want to add changes to the database and change the state of the input by clicking "Edit" Button
                  setChangeEdit((prevState) => !prevState)}}
                className='text-blue-600 hover:text-red-700 transition ease-in-out duration-300 ml-1 cursor-pointer'>
                  {changeEdit ? "Apply changes" : "Edit"}
                </span>
              </p>
              <p onClick = {onLogout}className='text-gray-600 hover:text-black transition duration-200 ease-in-out cursor-pointer'>
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Profile
