import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/ForgotPassword";
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import PRoute from "./Components/PRoute";
import Header from "./Components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/profile" element={<PRoute/>}>
            <Route path="/profile" element={<Profile/>}>
            
            </Route>
            </Route>
          
          <Route path="/sign-in" element={<Signin/>}></Route>
          <Route path="/sign-up" element={<SignUp/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/offers" element={<Offers/>}></Route>
        </Routes>
      </Router>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      
      
      </>
    </div>
  );
}

export default App;
