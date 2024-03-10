import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/ForgotPassword";
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
function App() {
  return (
    <div className="App">
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/sign-in" element={<Signin/>}></Route>
          <Route path="/sign-up" element={<SignUp/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/offers" element={<Offers/>}></Route>
        </Routes>
      </Router>
      </>
    </div>
  );
}

export default App;
