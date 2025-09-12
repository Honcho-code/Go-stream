import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", auth.currentUser);
      setError("");
      toast.success("Login successful!");
        navigate("/")
      setLoading(false);
    } catch (err) {
      console.log("Login error:", err);
      if (
        err.code === "auth/invalid-credentials" ||
        err.code === "auth/user-not-found"
      ) {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Network error. Please check your connection.");
      } else {
        setError("Login failed. Please try again later.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="flex flex-col items-center bg-zinc-50/10 px-4 py-5 w-full md:w-lg my-6 md:my-10 mx-4 md:mx-10 rounded-lg shadow-lg">
        <h1 className="headline-2 mb-4">Welcome Back</h1>
        <form className="flex flex-col w-full gap-4">
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
            onClick={handleLogin}
          >
            {loading ? (
              <div className="flex justify-center items-center py-1">
                <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p onClick={() => navigate("/signup")} className="mt-6 text-sm">
          Don't have an account?{" "}
          <span className="text-blue-800 cursor-pointer font-bold">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
