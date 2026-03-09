import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 28, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-8 w-56 h-56 rounded-full bg-white/10 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-6 w-72 h-72 rounded-full bg-blue-200/20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="z-10 flex justify-center items-center px-10 py-5 text-white mb-8"
      >
        <h1 className="text-3xl font-extrabold tracking-wide">TaskForge 📝</h1>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4 }}
        className="z-10 bg-white/20 border border-white/30 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96 text-white"
      >
        <motion.h1 variants={fieldVariants} className="text-3xl font-bold text-center mb-6">
          Create Account ✨
        </motion.h1>

        <motion.input
          variants={fieldVariants}
          whileFocus={{ scale: 1.02 }}
          className="w-full p-3 mb-4 rounded bg-black/30 outline-none placeholder-gray-200 focus:ring-2 focus:ring-indigo-200"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <motion.input
          variants={fieldVariants}
          whileFocus={{ scale: 1.02 }}
          className="w-full p-3 mb-4 rounded bg-black/30 outline-none placeholder-gray-200 focus:ring-2 focus:ring-indigo-200"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <motion.input
          variants={fieldVariants}
          whileFocus={{ scale: 1.02 }}
          className="w-full p-3 mb-5 rounded bg-black/30 outline-none placeholder-gray-200 focus:ring-2 focus:ring-indigo-200"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          variants={fieldVariants}
          whileHover={{ scale: 1.04, boxShadow: "0px 10px 24px rgba(37,99,235,0.45)" }}
          whileTap={{ scale: 0.96 }}
          onClick={register}
          className="w-full bg-blue-600 py-3 rounded font-bold tracking-wide"
        >
          Register
        </motion.button>

        <motion.p
          variants={fieldVariants}
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.03 }}
          className="mt-6 text-center underline cursor-pointer text-sm"
        >
          Already have an account? Login
        </motion.p>
      </motion.div>
    </div>
  );
}
