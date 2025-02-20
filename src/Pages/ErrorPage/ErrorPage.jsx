import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F4F6F8] text-[#01070D] text-center dark:bg-[#080A0C] dark:text-[#F1F7FE]">
      <motion.h1
        className="text-9xl font-extrabold text-[#2A2A72] dark:text-[#ACBDD1] drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <p className="text-2xl mt-4 text-[#01070D] dark:text-[#F1F7FE]">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/">
        <motion.button
          className="mt-6 px-6 py-3 text-lg font-bold bg-[#2A2A72] text-white rounded-xl shadow-lg hover:bg-[#83BAF2] dark:bg-[#ACBDD1] dark:text-[#080A0C] dark:hover:bg-[#0D457D] transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Go Home
        </motion.button>
      </Link>
    </div>
  );
}
