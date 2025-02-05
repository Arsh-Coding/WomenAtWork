import "./App.css";
import Navbar from "./components/Home/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import JobPage from "./components/Job/MainJob";
import Test from "./components/Job/Test";
import SignupPage from "./components/UserAuthentication/signup/signup";
import LoginPage from "./components/UserAuthentication/login/login";
import ApplyJob from "./components/Apply/ApplyJob";
import Profile from "./components/Profile/profile";
import MainContact from "./components/Home/Contact/MainContact";
import AboutUs from "./components/AboutUs/AboutUs";
import Wow from "./components/Wow/wow";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/JobPage" element={<JobPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/apply-job/:jobId/:companyId" element={<ApplyJob />} />
        <Route path="/contactUs" element={<MainContact />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/testimonials" element={<Wow />} />

        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </>
  );
}
export default App;
