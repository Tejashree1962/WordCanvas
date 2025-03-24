import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, updateToken, setUser } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const endpoint = state === "Login" ? "/api/user/login" : "/api/user/register";
      const payload = state === "Login" ? { email, password } : { name, email, password };

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        updateToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success(state === "Login" ? "Login Successful!" : "Account Created Successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div className="border px-5 py-2 flex items-center gap-2 rounded-full mt-4">
            <img src={assets.user_icon} alt="User Icon" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm"
              placeholder="Full name"
              required
            />
          </div>
        )}

        <div className="border px-5 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="Email Icon" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm"
            placeholder="Email id"
            required
          />
        </div>

        <div className="border px-5 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="Lock Icon" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="outline-none text-sm"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot Password?</p>
        <button type="submit" className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={() => setState("Sign up")}>
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={() => setState("Login")}>
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
