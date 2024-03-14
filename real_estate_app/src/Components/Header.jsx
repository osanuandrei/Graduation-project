import React from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    console.log("Current Path:", location.pathname); // Log current pathname

    function matchRoute(route) {
        if(route === location.pathname){
            return true;
        };
    }

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-55'> 
            <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div className='flex items-center'>
                    <img src='favicon.ico' alt='logo' className='h-6 cursor-pointer' onClick={() => navigate('/')} />
                    <h2 className='ml-2 text-lg'>
                        <span className='text-orange-500'>Cluj</span>
                        <span className='text-blue-500'>HomeFinder.ro</span>
                    </h2>
                </div> 
                <div>
                <ul className='flex space-x-10 text-lg'>  
                        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]  ${matchRoute("/") && "text-black border-b-red-500"}`} onClick={() => navigate('/')}>Home</li>
                        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]  ${matchRoute("/offers") && "text-black border-b-red-500"} `} onClick={() => navigate('/offers')}>Offers</li>
                        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]  ${matchRoute("/sign-in") && "text-black border-b-red-500"} }`} onClick={() => navigate('/sign-in')}>Sign in</li>
                    </ul>
                </div>
            </header>
        </div>
    );
}
