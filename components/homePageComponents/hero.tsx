'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import LeftSideHero from './leftSideHero';
import RightSideHero from './rightSideHero';

// Dynamic import to avoid SSR issues with Three.js
const Robot3DModel = dynamic(() => import('./window3dModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-950">
      {/* Dynamic CSS Lighting Effects */}
      <div className="absolute inset-0">
        {/* Blue light from left */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
        
        {/* White light from right */}
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl"
        />
        
        {/* Center ambient light for the cat */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Left Side - Company Info */}
        <div className="lg:col-span-1 flex items-center">
          <LeftSideHero />
        </div>

        {/* Center - 3D Model */}
        <div className="lg:col-span-1 relative flex items-center justify-center">
          {/* 3D Model Container with enhanced lighting */}
          <div className="relative w-full h-full">
            <Robot3DModel />
            
            {/* Additional lighting effects around the cat */}
            
          </div>

          {/* Floating particles around the model */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-60"
          />
          <motion.div
            animate={{
              y: [20, -20, 20],
              x: [10, -10, 10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-cyan-300 rounded-full opacity-50"
          />
          <motion.div
            animate={{
              y: [-15, 15, -15],
              x: [15, -15, 15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full opacity-70"
          />
        </div>

        
        {/*<div className="lg:col-span-1 flex items-center">
          <RightSideHero />
        </div>*/}
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
