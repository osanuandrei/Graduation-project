import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { toast } from 'react-toastify';

export default function Contact({userRef, listing}) {
    const [proprietar, setProprietar] = useState(null);
    const [mesaj, setMesaj] = useState("")

    function onChange (e) {
        setMesaj(e.target.value)
    }

    useEffect(() => {
        async function getProprietar() {
            const docRef = doc(db, "users", userRef)
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setProprietar(docSnap.data())
            }
            else {
                toast.error("Proprietar inexistent")
            }
        }

        getProprietar();

    }, [])

  return (
   <>
      {proprietar !== null && listing &&  (
        <div className='flex flex-col w-full mt-5'>
            <p>
                Contacteaza {proprietar.name} pentru {listing.titlu.toLowerCase()}
             </p>
             <div className='mt-3 mb-6'>
                <textarea className='w-full px-4 py-2 text-xl text-gray-600 border border-gray-300 rounded-md focus:border-slate-600' 
                name='mesaj' 
                id='mesaj' rows='2' 
                value={mesaj} 
                onChange={onChange}>

                </textarea>
             </div>
                <a href={`mailto:${proprietar.email}?Subject=${listing.titlu}&body=${mesaj}`}>
                <button className='w-full px-7 py-3 bg-red-600 text-white text-sm shadow-md hover:shadow-lg hover:bg-red-700 mb-4'>
                    Trimite mesaj
                </button>
                </a>
        </div>
    )}
      </>
  )
}
