import Login from "./Login";

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
  return <Login initialMode="signup" />;
}
