import React from 'react'
import loading from '../assets/loading.svg';
export default function Spinner() {
  return (
    <div className='bg-opacity-40 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0'>
      <div>
        <img src={loading} alt= 'Loading' className='h-24'></img>
      </div>
    </div>
  )
}
