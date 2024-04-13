import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import {toast} from 'react-toastify';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';
import ListingItems from '../Components/ListingItems';
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
const Profile = () => {
  const navigate = useNavigate();
  const [listings,setListings] = useState(null);
  const [loading,setLoading] = useState(true);
  const [changeEdit, setChangeEdit] = useState(false); // this is for Edit button, work with states to display different messages, also for enable/disable the ability for users to write in the name input
  const auth = getAuth();
  const [formData, setFormData] = useState({ // controll the inputs
    name: '',
    email: ''
  });

  useEffect(() => {
    // Fetch user information after componsent mounts
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

  async function onDelete(listingID) {
    if(window.confirm("Esti sigur ca vrei sa stergi ?")) {
      await deleteDoc(doc(db, "listings" , listingID))
      const updatedListings = listings.filter(
        (listing)=>listing.id !== listingID
      )
      setListings(updatedListings)
      toast.success("Ai sters oferta")
    }

  }

  function onEdit(listingId) {
      navigate(`/edit-listing/${listingId}`)
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
  useEffect(() => {
    async function fetchUserListing() {
      const listRef = collection(db, "listings");
      const q = query(listRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc")) // the new one comes fist by desc, with query we get the userRef
      const qSnap = await getDocs(q); 
      let listings = []; // use this variable to list the offers
      qSnap.forEach((doc)=> {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      
      setListings(listings);
      setLoading(false);
    }
    
    fetchUserListing();
  }, [auth.currentUser.uidd])
  return (
    <> 
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>  
        <h1 className='text-3xl text-center mt-6 font-bold'>Profilul tau</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            { /* Name Input */ }
            
            <input type='text' id='name' value={name} disabled={!changeEdit} onChange = {onChange}className= {`mb-5 w-full px-3 py-2 text-xl text-gray-800 bg-white
             border border-gray-300 rounded transition ease-in-out ${changeEdit && "bg-red-200 focus:bg-red-200"}`} >  
              </input> 

            { /* Email input */ }

            <input type='email' id='email' value={email} disabled className='w-full px-3 py-2 text-xl text-gray-800 bg-white border border-gray-300 rounded transition ease-in-out'></input>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='flex items-center mb-6'>Vrei sa-ti schimbi numele?
                <span
                onClick={() => {changeEdit && onSubmit();  // with onSubmit we want to add changes to the database and change the state of the input by clicking "Edit" Button
                  setChangeEdit((prevState) => !prevState)}}
                className='text-blue-600 hover:text-red-700 transition ease-in-out duration-300 ml-1 cursor-pointer'>
                  {changeEdit ? "Apply changes" : "Edit"}
                </span>
              </p>
              <p onClick = {onLogout}className='text-gray-600 hover:text-black transition duration-200 ease-in-out cursor-pointer'>
                Delogheaza-te
              </p>
            </div>
          </form>
          <button type='submit' className='px-4 py-2 bg-green-500  text-white rounded hover:bg-green-600 w-full uppercase font-medium shadow-md transition duration-200 ease-in-out'>
            <Link to='/create-listing' className='flex justify-center items-center'>
            <IoHome className='mr-2 text-2xl '/>
              Vinde sau inchiriaza-ti casa
            
            <IoHome className='ml-2 text-2xl'/>
            </Link>
          
          </button>
        </div>
      </section>
      <div className='max-w-6xl px-3 mt-6 mx-auto'>
        {!loading && listings.length > 0 && (
          <>
          <h2 className='text-2xl text-center font-semibold mb-6'>Ofertele mele</h2>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6'>
            {listings.map((listing) => (
              <ListingItems key={listing.id} 
              id={listing.id} 
              listing={listing.data}
              onDelete={()=>onDelete(listing.id)}
              onEdit={()=>onEdit(listing.id)}
              /> // show data on website from doc ref
            ))}
          </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Profile
