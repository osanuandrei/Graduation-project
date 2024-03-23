import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Auth from "../Components/Auth";
import { db } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // created the state mgm for the eye button 
  function onChange(e) { // with onChange we are managing states for every input ( name , email , password ) and we wanna create CONTROLLED INPUTS
    setFormData((prevState) => ({ 
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  
  async function onSubmit(e) { // auths the user using methods from firebase/auth 
    e.preventDefault(); 
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password; // deletes the password in the db for security 
      formDataCopy.timestamp = serverTimestamp(); //know the time the user created the account
      await setDoc(doc(db, "users", user.uid), formDataCopy) 
      // we created the collection users, using setDoc we introduce to DB the formdataCopy(name,email and timestamp because we removed the password)
      toast.success("Signed up successfully ")
      navigate("/");
      
    } catch (error) {
      toast.error("User not registered , something went wrong")
    }
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[65%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img"
            className="w-full rounded-2xl"
          ></img>
        </div>
        <div className="w-full md:w-[65%] lg:w-[38%] lg:ml-16">
          <form onSubmit={ onSubmit }>
          <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Your name"
            ></input>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            ></input>
            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              ></input>
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm">
              <p className="mb-6  ">
                Have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-800 transition-duration-200 ease-in-out ml-1"
                >
                  Sign in now
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-500 hover:text-blue-700 transition-duration-200 ease-in-out ml-1"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              className=" w-full bg-blue-500 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Sign Up
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

export default SignUp;
