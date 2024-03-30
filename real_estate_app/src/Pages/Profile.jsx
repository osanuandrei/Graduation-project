import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData, setFormData] = useState({
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
  return (
    <> 
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>  
        <h1 className='text-3xl text-center mt-6 font-bold'>Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            { /* Name Input */ }
            <input type='text' id='name' value={name} disabled className='mb-5 w-full px-3 py-2 text-xl text-gray-800 bg-white border border-gray-300 rounded transition ease-in-out'></input>

            { /* Email input */ }

            <input type='email' id='email' value={email} disabled className='w-full px-3 py-2 text-xl text-gray-800 bg-white border border-gray-300 rounded transition ease-in-out'></input>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='flex items-center mb-6'>Do you want to change your name ?
                <span className='text-blue-600 hover:text-red-700 transition ease-in-out duration-300 ml-1 cursor-pointer'>
                  Edit
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
