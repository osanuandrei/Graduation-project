import React, { useState } from 'react';

const Signin = () => {
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {email, password} = formData;
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign in</h1> 
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[65%] lg:w-[50%] mb-12 md:mb-6'>
          <img src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='img' className='w-full rounded-2xl'></img>
        </div>
        <div className='w-full md:w-[65%] lg:w-[38%] lg:ml-16'> 
          <form >
            <input className='w-full'type='email' id="email" value={email} onChange={onChange} placeholder='Email adress'></input>  
          </form>
        </div>
      </div>
    </section>
  )
}

export default Signin;

