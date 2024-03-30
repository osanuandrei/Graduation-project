import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false) // check if person is authenticated or not by state, false by default
    const [checkStatus, setCheckStatus] = useState(true)

    useEffect(() => { //use effect hook in orderr for the page to not render everytime
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if(user) { // if the person is authenticated , change the state
          setLoggedIn(true)
        }
        setCheckStatus(false)
      })
    })
  return (
    {loggedIn, checkStatus}
  )
}
