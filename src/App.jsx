import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Gallery from "./components/Gallery";
import { ToastContainer } from "react-toastify";
import LoginSignupModal from "./components/auth/Login";
import UploadModal from "./components/UploadModal";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <ToastContainer />
      <Navbar 
        setIsLoginModalOpen={setIsLoginModalOpen} 
        setIsUploadModalOpen={setIsUploadModalOpen} 
      />

      <Routes>
        <Route path="/" element={<Gallery />} />
      </Routes>

      <LoginSignupModal
        isOpen={isLoginModalOpen}
        closeModal={() => setIsLoginModalOpen(false)}
      />

      <UploadModal 
        isOpen={isUploadModalOpen} 
        setIsOpen={setIsUploadModalOpen}
      />
    </>
  );
}

export default App;
