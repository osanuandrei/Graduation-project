import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    const [pageState, setPageState] = useState('Sign in'); // default page, like we just entered, we will have Sign In top right

    useEffect(() => {
        onAuthStateChanged(auth, (user) => { // if user is authenticated, set page state to 'Profile'; otherwise set it to default (Sign in)
            if (user) {
                setPageState('Profil');
            } else {
                setPageState('Log in');
            }
        })
    }, [auth]);

    console.log("Current Path:", location.pathname); // Log current pathname

    function matchRoute(route) {
        return route === location.pathname;
    }

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="flex items-center">
                    <img src='favicon.ico' alt='logo' className='h-8 cursor-pointer' onClick={() => navigate('/')} />
                    <h2 className='ml-2 text-lg'>
                        <span className='text-orange-500'>Cluj</span>
                        <span className='text-blue-500'>HomeFinder.ro</span>
                    </h2>
                </div>
                <nav className="flex items-center">
                    <ul className="flex space-x-6 text-sm">
                        <li className={`cursor-pointer font-semibold ${matchRoute("/") ? 'text-red-500' : 'text-gray-300 hover:text-white'}`} onClick={() => navigate('/')}>Home</li>
                        <li className={`cursor-pointer font-semibold ${matchRoute("/offers") ? 'text-red-500' : 'text-gray-300 hover:text-white'}`} onClick={() => navigate('/offers')}>Oferte</li>
                        <li className={`cursor-pointer font-semibold ${matchRoute("/sign-in") || matchRoute("/profile") ? 'text-red-500' : 'text-gray-300 hover:text-white'}`} onClick={() => navigate('/profile')}>
                            {pageState}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
