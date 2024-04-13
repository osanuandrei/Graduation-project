import React from 'react'
import { Outlet , Navigate} from 'react-router-dom'; // Navigate directly redirect the person to the plaaces we want, works like "Link to"
import {useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

export default function PRoute() {
    const {loggedIn, checkStatus} = useAuthStatus() // can't go to profile page if user is not logged in / imported from our custom hook
    if(checkStatus) {
      return <Spinner/>
    }
  return loggedIn ? <Outlet/> : <Navigate to = "/sign-in"/>
}
