import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';
import { aboutLogsData } from '../../data';

export const AboutSection = () => {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <section id="about" className="py-24 px-6 md:px-12 brutal-border-b bg-[var(--color-bg)]">
      <div className="container mx-auto max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter mb-12"
        >
          System_Info
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bento Box 1: Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-1 brutal-border bg-white brutal-shadow aspect-square relative overflow-hidden"
          >
            {/* Duotone/Halftone effect simulation via CSS mix-blend-mode */}
            <div className="absolute inset-0 bg-[var(--color-accent-2)] mix-blend-color z-10 pointer-events-none" />
            <img 
              src="https://avatars.githubusercontent.com/u/51437979?v=4" 
              alt="Olive"
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
          </motion.div>

          {/* Bento Box 2: Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2 brutal-border bg-[var(--color-accent-1)] brutal-shadow p-8 flex flex-col justify-center relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!showLogs ? (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full justify-center"
                >
                  <div className="font-mono text-xl md:text-2xl leading-relaxed font-semibold">
                    <p className="mb-6">
                      I build systems that don't break. As a Backend Engineer, I specialize in distributed architectures, high-throughput microservices, and relentless optimization.
                    </p>
                    <p>
                      When I'm not writing C# or migrating databases, I'm exploring the intersection of heavy technical constraints and striking visual design.
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <CursorHoverBlock>
                      <button 
                        onClick={() => setShowLogs(true)}
                        className="brutal-border bg-white px-8 py-4 font-sans font-bold text-xl uppercase brutal-shadow hover:bg-[var(--color-text)] hover:text-white transition-colors cursor-none"
                      >
                        Read Full Logs
                      </button>
                    </CursorHoverBlock>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full bg-black text-green-500 font-mono p-6 brutal-border shadow-[4px_4px_0px_0px_rgba(0,255,0,0.5)] relative"
                >
                  <div className="flex justify-between items-center mb-4 border-b border-green-500/50 pb-2">
                    <span>system@core:~/logs</span>
                    <CursorHoverBlock>
                      <button 
                        onClick={() => setShowLogs(false)} 
                        className="text-white bg-red-600 px-3 py-1 font-bold hover:bg-red-500 transition-colors cursor-none text-sm"
                      >
                        [X]
                      </button>
                    </CursorHoverBlock>
                  </div>
                  <div className="flex-1 overflow-auto whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                    {aboutLogsData.map((log, index) => (
                      <React.Fragment key={index}>
                        {log.text}
                      </React.Fragment>
                    ))}
                    <br />
                    <span className="animate-pulse">_</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
