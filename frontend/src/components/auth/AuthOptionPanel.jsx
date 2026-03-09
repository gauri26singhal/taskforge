import { motion } from "framer-motion";

export default function AuthOptionPanel({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center text-3xl font-bold tracking-tight text-white"
      >
        Welcome to TaskForge
      </motion.h1>
      <p className="mt-3 text-center text-sm text-gray-300">
        Choose how you want to continue.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <motion.button
          whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(255,255,255,0.12)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("signin")}
          className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-medium text-white"
        >
          Sign In
        </motion.button>
        <motion.button
          whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(255,255,255,0.12)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("signup")}
          className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-5 py-3 font-medium text-cyan-100"
        >
          Sign Up
        </motion.button>
      </div>
    </motion.div>
  );
}
