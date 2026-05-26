import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { experienceData } from '../../data';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';
import { cn } from '../../lib/utils';

const pixelCursorRows = [
  'b.......',
  'bb......',
  'bwb.....',
  'bwwb....',
  'bwwwb...',
  'bwwwwb..',
  'bwwwwwb.',
  'bwwwwwwb',
  'bwwwbbbb',
  'bwwb....',
  'bwb.....',
  'bb......',
];

const PixelCursor = () => (
  <div
    className="grid [grid-template-columns:repeat(8,4px)] [grid-auto-rows:4px] [image-rendering:pixelated] drop-shadow-[4px_4px_0_var(--color-border)]"
    aria-hidden="true"
  >
    {pixelCursorRows.flatMap((row, rowIndex) =>
      row.split('').map((pixel, columnIndex) => (
        <span
          key={`${rowIndex}-${columnIndex}`}
          className={cn(
            'h-1 w-1',
            pixel === 'b' && 'bg-black',
            pixel === 'w' && 'bg-white'
          )}
        />
      ))
    )}
  </div>
);

const PixelClickCue = () => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.9 }}
    transition={{ delay: 0.35, duration: 0.25 }}
    className="pointer-events-none absolute bottom-3 right-10 z-30 h-16 w-16 sm:right-12 md:bottom-5 md:right-14"
  >
    <motion.span
      className="absolute -left-2 -top-2 h-5 w-5 border-4 border-black bg-[var(--color-accent-1)] opacity-0"
      animate={{
        scale: [0.25, 0.25, 1, 1.35],
        opacity: [0, 0, 0.9, 0],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        times: [0, 0.46, 0.58, 0.78],
        ease: 'easeOut',
      }}
    />
    <span className="absolute -left-1 top-0 h-3 w-3 border-2 border-black bg-[var(--color-accent-2)]" />

    <motion.div
      className="absolute left-0 top-0"
      animate={{
        x: [28, 16, 0, 0, 28],
        y: [22, 10, 0, 0, 22],
        rotate: [0, -5, -8, -8, 0],
        scale: [1, 1, 0.88, 1, 1],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        times: [0, 0.35, 0.5, 0.62, 1],
        ease: 'easeInOut',
      }}
    >
      <PixelCursor />
    </motion.div>
  </motion.div>
);

export const ExperienceSection = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
   <section
  id="experience"
  className="relative py-24 px-6 md:px-12 brutal-border-b bg-[#f7f2e8] overflow-hidden"
>
  <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:18px_18px]" />
  <div className="relative container mx-auto max-w-5xl">


        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter mb-16 text-right"
        >
          Operation_Logs
        </motion.h2>

        <div className="flex flex-col gap-6">
          {experienceData.map((item, i) => {
            const isActive = activeId === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <CursorHoverBlock>
                  <div 
                    onClick={() => {
                      setHasInteracted(true);
                      setActiveId(isActive ? null : item.id);
                    }}
                    className={cn(
                      "relative brutal-border p-6 md:p-8 brutal-shadow transition-colors duration-300",
                      isActive ? "bg-[var(--color-accent-1)]" : "bg-[var(--color-bg)] hover:bg-[#fff9c2]"
                    )}
                  >
                    {i === 0 && !hasInteracted && !isActive && <PixelClickCue />}

                    <div className="flex flex-col md:flex-row md:items-end justify-between font-sans uppercase">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{item.role}</h3>
                        <div className="text-xl md:text-2xl font-medium mt-2">{item.company}</div>
                      </div>
                      <div className="font-mono text-lg md:text-xl font-bold mt-4 md:mt-0 opacity-80">
                        {item.dates}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-8 pt-8 font-mono text-base md:text-lg border-t-4 border-black space-y-4">
                            {item.points.map((point, idx) => (
                              <li key={idx} className="flex gap-4">
                                <span className="font-bold text-[var(--color-accent-2)]">&gt;</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CursorHoverBlock>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
