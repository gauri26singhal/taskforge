import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="flex justify-center items-center px-10 py-5 text-white mb-10">
        <h1 className="text-3xl font-extrabold tracking-wide">TaskForge 📝</h1>
      </div>
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/20 backdrop-blur-lg p-10 rounded-xl shadow-2xl w-96 text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account ✨
        </h1>

        <input
          className="w-full p-3 mb-4 rounded bg-black/30 outline-none placeholder-gray-200"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-black/30 outline-none placeholder-gray-200"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 mb-5 rounded bg-black/30 outline-none placeholder-gray-200"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={register}
          className="w-full bg-blue-600 py-3 rounded font-bold tracking-wide"
        >
          Register
        </motion.button>

        <p
          onClick={() => navigate("/")}
          className="mt-6 text-center underline cursor-pointer text-sm"
        >
          Already have an account? Login
        </p>
      </motion.div>
    </div>
  );
}
