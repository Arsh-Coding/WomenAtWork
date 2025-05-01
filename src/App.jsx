import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "./components/Home/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import JobPage from "./components/Job/MainJob";
import Test from "./components/Job/Test";
import SignupPage from "./components/UserAuthentication/signup/signup";
import LoginPage from "./components/UserAuthentication/login/login";
import ApplyJob from "./components/Apply/ApplyJob";
import Profile from "./components/Profile/candidateProfile";
import MainContact from "./components/Home/Contact/MainContact";
import AboutUs from "./components/AboutUs/AboutUs";
import Wow from "./components/Wow/wow";
import ProtectedRoute from "./ProtectedRoute";
import ResumeUpload from "./components/Profile/ResumeProfile";
import Dashboard from "./components/Profile/Dashboard";
import AppliedJobs from "./components/Profile/AppliedJobs";

function App() {
  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: " 100vh",
        }}
      >
        <h2>Something went wrong:</h2>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/JobPage" element={<JobPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/candidate profile"
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
          <Route path="/resumeUpload" element={<ResumeUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
export default App;
