'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LeftSideHero = () => {
  return (
    <div className="relative z-10 flex flex-col justify-center h-full">
      {/* Background gradient for blue lighting effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 px-8 lg:px-16"
      >
        {/* Company Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl lg:text-3xl  text-white mb-6 tracking-tight"
        >
          <span className=" ">Your Business Deserves More Than Just a Website </span>
          
          <span className=" bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            It Deserves a Digital Experience.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl lg:text-xl text-gray-300 max-w-md leading-relaxed mb-8"
        >
          From custom websites and mobile apps to SEO-optimized platforms and desktop solutions,
           we turn your ideas into cutting-edge software tailored to Tunisian and global markets.

          Add stunning  
          <span className="text-blue-400 font-semibold"> 3D designs, seamless UX, and smart tech</span>
          — built to grow your business.
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className=" flex flex-col sm:flex-row gap-4"
        >
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95">
            Contact Us
          </button>
          <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-lg transition-all duration-300 active:scale-95">
            See Our Work
          </button>
        </motion.div>

        {/* Floating particles for ambiance */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-32 w-1 h-1 bg-cyan-300 rounded-full animate-ping" />
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
      </motion.div>
    </div>
  );
};

export default LeftSideHero;
