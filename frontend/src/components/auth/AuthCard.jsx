import { motion } from "framer-motion";
import LoadingButton from "./LoadingButton";

export default function AuthCard({
  mode,
  fields,
  onChange,
  onSubmit,
  loading,
  onClose,
}) {
  const isSignIn = mode === "signin";

  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, y: isSignIn ? -80 : 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isSignIn ? -80 : 80 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-7 shadow-[0_20px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">
          {isSignIn ? "Sign In" : "Create Account"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-white/20 px-3 py-1 text-sm text-gray-200 hover:bg-white/10"
        >
          Close
        </button>
      </div>

      <div className="space-y-4">
        {!isSignIn && (
          <input
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-cyan-300/50"
            placeholder="Name"
            value={fields.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        )}

        <input
          className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-cyan-300/50"
          placeholder="Email"
          type="email"
          value={fields.email}
          onChange={(e) => onChange("email", e.target.value)}
        />

        <input
          className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-cyan-300/50"
          placeholder="Password"
          type="password"
          value={fields.password}
          onChange={(e) => onChange("password", e.target.value)}
        />

        {!isSignIn && (
          <input
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-cyan-300/50"
            placeholder="Confirm Password"
            type="password"
            value={fields.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
          />
        )}

        <LoadingButton
          loading={loading}
          onClick={onSubmit}
          className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
        >
          {isSignIn ? "Login" : "Register"}
        </LoadingButton>
      </div>
    </motion.div>
  );
}
