import "./App.css";
import Navbar from "./components/Home/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import JobPage from "./components/Job/MainJob";
import Test from "./components/Job/Test";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/JobPage" element={<JobPage />} />
        <Route path="/test" element={<Test />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </>
  );
}
export default App;
