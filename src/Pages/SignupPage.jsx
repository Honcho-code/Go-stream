import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      console.log("Account created sucessfully", auth.currentUser);
      setError("");
      navigate("/login");
      toast.success("Account created! Please log in.");
      setLoading(false);
    } catch (err) {
      console.log("Signup error:", err.code, err.message);

      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (err.code === "auth/password-does-not-meet-requirements") {
        setError("Password should be at least 6 characters.");
        setError("Password must contain an uppercase");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Network error. Please check your connection.");
      } else {
        setError("Signup failed. Please try again later.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="flex flex-col items-center bg-zinc-50/10 px-4 py-5 w-full md:w-lg my-6 md:my-10 mx-4 md:mx-10 rounded-lg shadow-lg">
        <h1 className="headline-2 mb-4">Create an Account</h1>
        <form className="flex flex-col w-full gap-4">
          <input
            type="text"
            placeholder="Username"
            autoComplete="new-username"
            className="border py-2 px-3 outline-blue-800 bg-zinc-800 rounded-xl"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="new-email"
            className="border py-2 px-3 outline-blue-800 bg-zinc-800 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className="border py-2 px-3 outline-blue-800 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-red-700 text-sm md:text-[16px]">{error}</p>
          )}
          <button
            className="bg-blue-800 cursor-pointer text-white p-2 rounded-xl"
            onClick={handleSignup}
          >
            {loading ? (
              <div className="flex justify-center items-center py-1">
                <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p onClick={() => navigate("/login")} className="mt-6 text-sm">
          Already have an account?{" "}
          <span className="text-blue-800 cursor-pointer font-bold">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
