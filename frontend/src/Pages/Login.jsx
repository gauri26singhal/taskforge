import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);

    toast.success("Login successful yeahhh !! 😇");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed oops !! 😞");
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="flex justify-center items-center px-10 py-5 text-white mb-10">
        <h1 className="text-3xl font-extrabold tracking-wide">TaskForge 📝</h1>
      </div>
      
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/20 backdrop-blur-lg p-10 rounded-xl shadow-xl w-96 text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h1>

        <input
          className="w-full p-3 mb-4 rounded bg-black/30 outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-black/30 outline-none"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={submit}
          className="w-full bg-purple-700 py-3 rounded font-bold"
        >
          Login
        </motion.button>

        
        <p
          onClick={() => navigate("/register")}
          className="mt-5 text-center underline cursor-pointer"
        >
          Register new account
        </p>
      </motion.div>
    </div>
  );
}
