import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const containerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

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
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700">
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -18, 0], y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-12 -right-10 w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex justify-center items-center px-10 py-5 text-white mb-8"
      >
        <h1 className="text-3xl font-extrabold tracking-wide">TaskForge 📝</h1>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4 }}
        className="z-10 bg-white/20 border border-white/30 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-96 text-white"
      >
        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </motion.h1>

        <motion.input
          variants={itemVariants}
          whileFocus={{ scale: 1.02 }}
          className="w-full p-3 mb-4 rounded bg-black/30 outline-none focus:ring-2 focus:ring-cyan-300"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <motion.input
          variants={itemVariants}
          whileFocus={{ scale: 1.02 }}
          className="w-full p-3 mb-4 rounded bg-black/30 outline-none focus:ring-2 focus:ring-cyan-300"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.04, boxShadow: "0px 10px 24px rgba(59,130,246,0.45)" }}
          whileTap={{ scale: 0.96 }}
          onClick={submit}
          className="w-full bg-purple-700 py-3 rounded font-bold"
        >
          Login
        </motion.button>

        <motion.p
          variants={itemVariants}
          onClick={() => navigate("/register")}
          whileHover={{ scale: 1.03 }}
          className="mt-5 text-center underline cursor-pointer"
        >
          Register new account
        </motion.p>
      </motion.div>
    </div>
  );
}
