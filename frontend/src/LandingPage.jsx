import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PremiumLandingPage = ({ navigateToTodos }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-extrabold text-white mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-teal-400">
                Elevate Your Productivity
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Experience the future of task management with our premium platform designed for ambitious professionals.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-full hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
              onClick={navigateToTodos}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Premium Features
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl transform transition-all duration-300 group-hover:opacity-100 opacity-0" />
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="relative p-12 bg-gradient-to-r from-teal-600/20 to-amber-600/20 backdrop-blur-lg rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/30 to-amber-600/30 transform rotate-6 scale-150" />
          <div className="relative text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of professionals who have already elevated their productivity.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-full hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
              onClick={navigateToTodos}
            >
              Start Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const features = [
  {
    title: "Intelligent Dashboard",
    description: "Experience a beautifully designed interface that adapts to your workflow and presents your tasks in an intuitive manner."
  },
  {
    title: "Smart Prioritization",
    description: "Our AI-powered system learns from your habits and automatically suggests the most effective task ordering."
  },
  {
    title: "Real-time Analytics",
    description: "Get detailed insights into your productivity patterns with beautiful, interactive visualizations."
  }
];

export default PremiumLandingPage;