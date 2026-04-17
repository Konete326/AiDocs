import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RANDOM_CHARS = "!@#$%^&*()_+{}:?><";

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
        }).join("")
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1/3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function DynamicHeadline({ texts }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tighter leading-tight max-w-2xl px-4"
        >
          <ScrambleText text={texts[index]} />
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
