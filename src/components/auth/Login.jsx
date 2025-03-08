import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";

const LoginSignupModal = ({ isOpen, closeModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Login form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign-up form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
    }
  }, [isOpen]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (!isOpen) return null;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleSignupEmailChange = (e) => {
    setSignupEmail(e.target.value);
  };
  const handleSignupPasswordChange = (e) => {
    setSignupPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await API.post("/users/login", { email, password });

      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        console.log("Token saved in sessionStorage:", response.data.token);
        toast.success("Login successful!");
        closeModal;
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/users/signup", {
        firstName,
        lastName,
        email: signupEmail,
        password: signupPassword,
      });

      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        console.log("Token saved in sessionStorage:", response.data.token);
        toast.success("Sign up successful!");
        closeModal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-purple-50 to-indigo-100 ">
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url('/api/placeholder/1920/1080')`,
        }}
      />

      {/* Demo Button (to reopen modal) */}
      {!isOpen && (
        <button
          onClick={openModal}
          className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          Open Login
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 "
            style={{ backdropFilter: "blur(8px)" }}
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden z-10">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <h2 className="text-2xl font-bold">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              <p className="text-indigo-100 mt-1">
                {isLogin
                  ? "Welcome back! Please enter your details."
                  : "Create an account to get started."}
              </p>
            </div>

            {/* Form Container */}
            <div className="p-6">
              {isLogin ? (
                // Login Form
                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center"></div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2 px-4 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>
              ) : (
                // Signup Form
                <form className="space-y-4" onSubmit={handleSignupSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="First name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Last name"
                        value={lastName}
                        onChange={handleLastNameChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={handleSignupEmailChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Create a password"
                      value={signupPassword}
                      onChange={handleSignupPasswordChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200"
                  >
                    Create Account
                  </button>
                </form>
              )}

              {/* Form Toggle */}
              <div className="mt-6 text-center text-sm text-gray-600">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={toggleForm}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignupModal;
