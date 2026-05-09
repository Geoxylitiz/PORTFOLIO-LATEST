import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { skillsData } from '../../data';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';

// ─── Hook: detect mobile breakpoint ───────────────────────────────────────────
const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
};

// ─── Desktop: draggable skill pill ────────────────────────────────────────────
const SkillPill = ({
  skill,
  containerRef,
}: {
  skill: string;
  containerRef: React.RefObject<HTMLDivElement>;
}) => (
  <CursorHoverBlock className="inline-block p-1">
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      className="brutal-border brutal-shadow bg-[var(--color-accent-1)] px-6 py-3 font-mono text-xl font-bold uppercase select-none cursor-grab active:cursor-grabbing transition-colors hover:bg-white"
      initial={{ y: Math.random() * 100 - 50, x: Math.random() * 100 - 50, opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.5 }}
      viewport={{ once: true }}
    >
      {skill}
    </motion.div>
  </CursorHoverBlock>
);

// ─── Mobile: bento cell ───────────────────────────────────────────────────────
// Cycles through accent colors and makes every 7th cell span 2 columns.
const BENTO_COLORS = [
  'bg-[var(--color-accent-1)]',        // yellow
  'bg-white',
  'bg-[var(--color-accent-3)]',   
  'bg-[var(--color-accent-2)]',
  'bg-[var(--color-accent-1)]',
  'bg-white',
];

const BentoCell = ({ skill, index }: { skill: string; index: number }) => {
  const isWide = (index + 1) % 7 === 0;
  const colorClass = isWide
    ? 'bg-[var(--color-black)] text-[var(--color-accent-1)]'
    : BENTO_COLORS[index % BENTO_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, type: 'spring', stiffness: 200 }}
      viewport={{ once: true }}
      className={[
        'flex items-center justify-center',
        'border-r-[4px] border-b-[4px] border-[var(--color-black)]',
        'px-3 py-4 min-h-[56px]',
        'font-mono font-black text-xs uppercase tracking-wide text-center',
        'active:scale-95 transition-transform',
        isWide ? 'col-span-2 text-sm py-5' : '',
        colorClass,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {skill}
    </motion.div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const SkillsPhysics = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-12 brutal-border-b bg-[var(--color-bg)]"
    >
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter mb-16 text-center"
        >
          Tech_Capabilities
        </motion.h2>

        {/* ── MOBILE: Bento box ── */}
        {isMobile ? (
          <div
            className="brutal-border brutal-shadow overflow-hidden"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              borderTop: '4px solid var(--color-black)',
              borderLeft: '4px solid var(--color-black)',
            }}
          >
            {skillsData.map((skill, index) => (
              <BentoCell key={index} skill={skill} index={index} />
            ))}
          </div>
        ) : (
          /* ── DESKTOP: Draggable physics container ── */
          <div
            ref={containerRef}
            className="w-full min-h-[500px] brutal-border bg-white relative overflow-hidden flex flex-wrap content-center justify-center gap-4 p-8 brutal-shadow"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            {skillsData.map((skill, index) => (
              <SkillPill key={index} skill={skill} containerRef={containerRef} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};