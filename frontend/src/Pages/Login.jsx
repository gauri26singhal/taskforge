import { useMemo, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthOptionPanel from "../components/auth/AuthOptionPanel";
import AuthCard from "../components/auth/AuthCard";

const initialFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Login({ initialMode = null }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [fields, setFields] = useState(initialFields);
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => {
    if (mode === "signin") return "Secure sign in";
    if (mode === "signup") return "Create your account";
    return "Cinematic Authentication";
  }, [mode]);

  const updateField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const resetToChooser = () => {
    setMode(null);
    setFields(initialFields);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (mode === "signin") {
      if (!fields.email || !fields.password) {
        toast.error("Please enter email and password.");
        return;
      }
    }

    if (mode === "signup") {
      if (!fields.name || !fields.email || !fields.password || !fields.confirmPassword) {
        toast.error("Please complete all sign up fields.");
        return;
      }
      if (fields.password !== fields.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: fields.email,
          password: fields.password,
        });
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        await axios.post("http://localhost:5000/api/auth/register", {
          name: fields.name,
          email: fields.email,
          password: fields.password,
        });
        toast.success("Account created successfully");
        setMode("signin");
        setFields((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.22),transparent_34%)]"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-cyan-200/70"
        >
          {title}
        </motion.p>

        <div className="mx-auto w-full max-w-md">
          <AnimatePresence mode="wait">
            {!mode ? (
              <AuthOptionPanel key="chooser" onSelect={setMode} />
            ) : (
              <AuthCard
                key={mode}
                mode={mode}
                fields={fields}
                onChange={updateField}
                onSubmit={handleSubmit}
                loading={loading}
                onClose={resetToChooser}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
