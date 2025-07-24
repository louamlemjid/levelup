'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RightSideHero = () => {
  const [percentage, setPercentage] = useState(0);
  const [showWebsiteCard, setShowWebsiteCard] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [showCoins, setShowCoins] = useState(false);
  const [coins, setCoins] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Countdown animation
  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowWebsiteCard(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Website card slidedown and user count
  useEffect(() => {
    if (showWebsiteCard) {
      setTimeout(() => {
        setUserCount(2);
        const userTimer = setInterval(() => {
          setUserCount((prev) => {
            if (prev >= 1000) {
              clearInterval(userTimer);
              setShowCoins(true);
              return 1000;
            }
            return prev + Math.floor(Math.random() * 20) + 5;
          });
        }, 200);

        return () => clearInterval(userTimer);
      }, 2000);
    }
  }, [showWebsiteCard]);

  // Coin drop animation
  useEffect(() => {
    if (showCoins) {
      const coinTimer = setInterval(() => {
        const newCoin = {
          id: Date.now() + Math.random(),
          x: Math.random() * 300,
          y: -20,
        };
        setCoins((prev) => [...prev, newCoin]);

        setTimeout(() => {
          setCoins((prev) => prev.filter((coin) => coin.id !== newCoin.id));
        }, 3000);
      }, 300);

      return () => clearInterval(coinTimer);
    }
  }, [showCoins]);

  return (
    <div className="relative z-10 flex flex-col justify-center items-center h-full px-8 lg:px-16">
      {/* Background gradient for white lighting effect */}
      <div className="absolute inset-0 bg-gradient-to-l from-white/10 via-gray-100/5 to-transparent pointer-events-none" />
      
      {/* Countdown Percentage */}
      <AnimatePresence>
        {!showWebsiteCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              key={percentage}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
              className="text-9xl lg:text-[12rem] font-bold text-white mb-4 tracking-tight"
            >
              {percentage}%
            </motion.div>
            <p className="text-xl text-gray-300">Building your success...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Card */}
      <AnimatePresence>
        {showWebsiteCard && (
          <motion.div
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-lg shadow-2xl w-80 mb-8"
            >
              <div className="bg-white rounded-md p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Your 3D Website</h3>
              <p className="text-blue-100 text-sm">Ready to launch!</p>
            </motion.div>

            {/* User Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                key={userCount}
                initial={{ scale: 1.2, color: "#60a5fa" }}
                animate={{ scale: 1, color: "#ffffff" }}
                transition={{ duration: 0.3 }}
                className="text-6xl font-bold text-white mb-2"
              >
                +{userCount}
              </motion.div>
              <p className="text-gray-300 text-lg">New clients attracted</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Coins */}
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{ x: coin.x, y: coin.y, opacity: 1, scale: 1 }}
            animate={{ 
              y: 600, 
              opacity: [1, 1, 0],
              rotate: 360,
              scale: [1, 1.2, 0.8]
            }}
            transition={{ duration: 3, ease: "easeIn" }}
            className="absolute text-3xl pointer-events-none"
            style={{ left: coin.x, top: coin.y }}
          >
            💰
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating elements for ambiance */}
      <div className="absolute top-32 right-16 w-2 h-2 bg-white rounded-full animate-pulse" />
      <div className="absolute top-52 right-8 w-1 h-1 bg-gray-300 rounded-full animate-ping" />
      <div className="absolute bottom-32 right-24 w-3 h-3 bg-white/50 rounded-full animate-bounce" />
    </div>
  );
};

export default RightSideHero;
