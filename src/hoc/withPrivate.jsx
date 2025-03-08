import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoginSignupModal from "../components/auth/Login";

const withPrivate = (Component) => {
  const AuthRoute = (props) => {
    const token = sessionStorage.getItem("token");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
      if (!token) {
        toast.warning("Please log in to continue!");
        setIsLoginModalOpen(true);
      }
    }, [token]);

    if (!token) {
      return (
        <>
          <LoginSignupModal
            isOpen={isLoginModalOpen}
            closeModal={() => setIsLoginModalOpen(false)}
          />
        </>
      );
    }

    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withPrivate;
