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

import PdfToPpt from "./pages/conversions/PdfToPpt";       
  
import ResetPassword from "./pages/ResetPassword";
import ExcelToPdf from "./pages/conversions/ExcelToPdf";
import PptToPdf from "./pages/conversions/PptToPdf";
import ImageToPdf from "./pages/conversions/ImageToPdf";

const AppRoutes = () => {
  const location = useLocation();
  const hideFooterOn = ["/signin", "/signup"];

  return (
    <div className="flex flex-col min-h-screen"> {/* ✅ make full height flex container */}
      <Navbar />

      <div className="flex-grow"> {/* ✅ this grows to fill space above footer */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Conversion routes */}
          <Route path="/convert/doc-to-pdf" element={<DocToPdf />} />
          <Route path="/convert/excel-to-pdf" element={<ExcelToPdf />} />
          <Route path="/convert/ppt-to-pdf" element={<PptToPdf />} />
          <Route path="/convert/image-to-pdf" element={<ImageToPdf />} />
          <Route path="/convert/pdf-to-ppt" element={<PdfToPpt />} />
          
        </Routes>
      </div>

      {/* ✅ Footer stays at bottom */}
      {!hideFooterOn.includes(location.pathname) && <Footer />}
    </div>
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
