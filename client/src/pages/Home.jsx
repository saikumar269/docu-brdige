import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import Lottie from "lottie-react";
import animationData from "../constants/animation.json";
import { motion } from "framer-motion";

const Home = () => {
  const { user, isGuest, startGuest } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col">
      {/* Hero Section */}
      <motion.section
        className="px-6 grid md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Text Content */}
        <div className="space-y-6">
          {user && (
            <h2 className="text-3xl font-bold text-blue-700 mb-4">
              Welcome, {user?.name} 👋
            </h2>
          )}

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-green-800"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Convert & Edit Your Files with Ease 🧩
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9 }}
          >
            Convert between PDF, Word, Excel, and DOC — with built-in editing so you never need to switch tools.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            {!user && !isGuest && (
              <>
                <button onClick={() => navigate("/signin")} className="btn-primary">
                  Sign In
                </button>
                <button onClick={() => navigate("/signup")} className="btn-secondary">
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    startGuest();
                    navigate("/convert");
                  }}
                  className="btn-tertiary"
                >
                  Continue as Guest
                </button>
              </>
            )}

            {user && (
              <button onClick={() => navigate("/convert")} className="btn-primary-lg">
                Start File Conversion
              </button>
            )}
          </motion.div>
        </div>

        {/* Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Lottie animationData={animationData} loop className="h-[600px] w-[600px] p-[10px]" />
        </motion.div>
      </motion.section>

      {/* Feature Section */}
      <motion.section
        className="bg-gray-100 py-10 px-6 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Why Choose DocuBridge?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: "📁 Format Conversion", desc: "PDF, Word, Excel and more." },
            { title: "✏️ In-App Editing", desc: "Edit your files directly in the app." },
            { title: "🔒 Privacy Focused", desc: "Files are deleted after processing securely." },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="bg-white shadow rounded p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
