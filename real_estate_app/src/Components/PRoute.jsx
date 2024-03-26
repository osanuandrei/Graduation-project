import React from 'react'
import { Outlet , Navigate} from 'react-router-dom'; // Navigate directly redirect the person to the plaaces we want, works like "Link to"

export default function PRoute() {
    const loggedin = false; // can't go to profile page if user is not logged in
  return loggedin ? <Outlet/> : <Navigate to = "/sign-in"/>
}
