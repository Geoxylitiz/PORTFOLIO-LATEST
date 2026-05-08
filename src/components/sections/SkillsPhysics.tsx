import React, { useRef, useEffect, useState } from 'react';
import { motion, useDragControls } from 'motion/react';
import { skillsData } from '../../data';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';

// We'll use Framer Motion drag since it was requested as an option 
// and avoids adding heavy physics libraries if not strictly necessary.
// We simulate "bounce" constraints.

const SkillPill = ({ skill, containerRef }: { skill: string, containerRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <CursorHoverBlock className="inline-block p-1">
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        whileDrag={{ scale: 1.1, zIndex: 50 }}
        className="brutal-border brutal-shadow bg-[var(--color-accent-1)] px-6 py-3 font-mono text-xl font-bold uppercase select-none transition-colors hover:bg-white"
        initial={{ y: Math.random() * 100 - 50, x: Math.random() * 100 - 50, opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        viewport={{ once: true }}
      >
        {skill}
      </motion.div>
    </CursorHoverBlock>
  );
};

export const SkillsPhysics = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 brutal-border-b bg-[var(--color-bg)]">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter mb-16 text-center"
        >
          Tech_Capabilities
        </motion.h2>

        <div 
          ref={containerRef}
          className="w-full min-h-[500px] brutal-border bg-white relative overflow-hidden flex flex-wrap content-center justify-center gap-4 p-8 brutal-shadow"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          
          {skillsData.map((skill, index) => (
            <SkillPill key={index} skill={skill} containerRef={containerRef} />
          ))}
        </div>
      </div>
    </section>
  );
};
