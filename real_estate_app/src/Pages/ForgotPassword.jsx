import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../Components/Auth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  function onChange(e) {
    setEmail(e.target.value)
    };
  async function onSubmit(e) {
    try {
      e.preventDefault();
      const auth = getAuth();
      await sendPasswordResetEmail(auth,email); // built in email send by firebase
      toast.success("Email sent!")
    } catch (error) {
      toast.error("Couldn't reset password")
    }
  }
  
  
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Am uitat parola</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[65%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img"
            className="w-full rounded-2xl"
          ></img>
        </div>
        <div className="w-full md:w-[65%] lg:w-[38%] lg:ml-16">
          <form onSubmit={onSubmit}>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email adress"
            ></input>
            
            <div className="flex justify-between whitespace-nowrap text-sm">
              <p className="mb-6  ">
                Nu ai un cont ?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-800 transition-duration-200 ease-in-out ml-1"
                >
                  Inregistreaza-te acum!
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-500 hover:text-blue-700 transition-duration-200 ease-in-out ml-1"
                >
                  Logheaza-te 
                </Link>
              </p>
            </div>
            <button
              className=" w-full bg-blue-500 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Reseteaza parola
            </button>
            <div className="flex my-4 before:border-t before:flex-1 before:border-gray-400 items-center after:border-t after:flex-1 after:border-gray-400">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Auth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
