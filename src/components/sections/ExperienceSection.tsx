import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { experienceData } from '../../data';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';
import { cn } from '../../lib/utils';

export const ExperienceSection = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 px-6 md:px-12 brutal-border-b bg-white">
      <div className="container mx-auto max-w-5xl">
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
                    onClick={() => setActiveId(isActive ? null : item.id)}
                    className={cn(
                      "brutal-border p-6 md:p-8 brutal-shadow transition-colors duration-300",
                      isActive ? "bg-[var(--color-accent-1)]" : "bg-[var(--color-bg)] hover:bg-[#fff9c2]"
                    )}
                  >
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
