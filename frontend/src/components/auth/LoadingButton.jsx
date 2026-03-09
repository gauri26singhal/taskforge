import { motion } from "framer-motion";

export default function LoadingButton({ children, loading, className = "", ...props }) {
  return (
    <motion.button
      whileHover={!loading ? { scale: 1.02 } : undefined}
      whileTap={!loading ? { scale: 0.98 } : undefined}
      disabled={loading}
      className={`w-full rounded-xl px-4 py-3 font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {loading && (
          <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
        )}
        {loading ? "Please wait..." : children}
      </span>
    </motion.button>
  );
}
