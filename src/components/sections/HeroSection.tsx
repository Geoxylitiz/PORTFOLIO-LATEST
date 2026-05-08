import React, { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';

const HeroCanvas = lazy(() => import('../3d/HeroCanvas'));

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden brutal-border-b">
      <Suspense fallback={<div className="absolute inset-0 bg-grid-pattern opacity-60" />}>
        <HeroCanvas />
      </Suspense>

      <div className="container relative mx-auto px-6 md:px-12 z-10 pointer-events-none">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-sans uppercase leading-none tracking-tighter text-[var(--color-text)]">
            <span className="block">Patrick</span>
            <span className="block">Oliver</span>
          </h1>
          
          <div className="mt-8 flex flex-wrap gap-4 pointer-events-auto">
            <CursorHoverBlock>
              <div className="inline-block brutal-border bg-[var(--color-accent-1)] px-6 py-3 font-mono text-xl font-bold uppercase brutal-shadow">
                Backend Engineer
              </div>
            </CursorHoverBlock>
            <CursorHoverBlock>
              <div className="inline-block brutal-border bg-white px-6 py-3 font-mono text-xl font-bold uppercase brutal-shadow">
                Fullstack
              </div>
            </CursorHoverBlock>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full brutal-border-t bg-[var(--color-accent-2)] py-4 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex font-mono text-xl font-bold uppercase"
        >
          {Array(10).fill("/// SOFTWARE DEVELOPER /// FULLSTACK-DEVELOPER (AI-FIRST) /// DEVOPS /// AI ENGINEER /// ").map((text, i) => (
             <span key={i} className="mx-4">{text}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
