// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Convert from "./pages/Convert";
import Profile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import Downloads from "./pages/Downloads";
import DocToPdf from "./pages/conversions/DocToPdf";
import ForgotPassword from "./pages/ForgotPassword";
// import ResetWithOtp from "./pages/ResetWithOtp";
import ResetPassword from "./pages/ResetPassword";
// import DocToExcel from "./pages/conversions/DocToExcel";
// import ExcelToDoc from "./pages/conversions/ExcelToDoc";
// import ExcelToPdf from "./pages/conversions/ExcelToPdf";
// import PdfToDoc from "./pages/conversions/PdfToDoc";
// import PdfToExcel from "./pages/conversions/PdfToExcel";


const AppRoutes = () => {
  const location = useLocation();
  const hideFooterOn = ["/signin", "/signup"];

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/convert/doc-to-pdf" element={<DocToPdf />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />

        
      </Routes>
      {!hideFooterOn.includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
