import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { skillGroups } from '../../data';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';
import { cn } from '../../lib/utils';


const SkillChip = ({
  skill,
  index,
  containerRef,
}: {
  skill: string;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => (
  <CursorHoverBlock className="w-full sm:w-auto">
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.12}
      whileHover={{ y: -4 }}
      whileDrag={{ scale: 1.08, zIndex: 40 }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.025, type: 'spring', stiffness: 240, damping: 22 }}
      viewport={{ once: true }}
      className="brutal-border bg-[var(--color-bg)] px-4 py-3 text-center font-mono text-sm font-black uppercase leading-none text-[var(--color-text)] brutal-shadow select-none cursor-grab active:cursor-grabbing sm:min-w-[128px] md:text-base"
    >
      {skill}
    </motion.div>
  </CursorHoverBlock>
);

export const SkillsPhysics = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  let chipIndex = 0;

  return (
    <section id="skills" className="bg-[var(--color-bg)] px-6 py-24 brutal-border-b md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="font-sans text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter text-center">
              Capability_Matrix
            </h2>
          </motion.div>
        </div>

        <motion.div
          ref={boardRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-120px' }}
          className="relative overflow-hidden brutal-border bg-[var(--color-bg)] p-4 brutal-shadow md:p-6"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-20 invert pointer-events-none" />
          <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="brutal-border bg-[var(--color-accent-1)] p-5 lg:col-span-3 lg:min-h-[520px]">
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <ShieldCheck className="mb-6 h-12 w-12" strokeWidth={3} />
                  <div className="font-mono text-sm font-black uppercase">Verified Stack</div>
                  <div className="mt-4 font-sans text-5xl font-black uppercase leading-none tracking-tighter md:text-6xl">
                    {skillGroups.reduce((acc, group) => acc + group.skills.length, 0)}
                    <span className="block text-2xl md:text-3xl">Signals</span>
                  </div>
                </div>

                <div className="border-t-4 border-black pt-5 font-mono text-sm font-bold uppercase leading-relaxed">
                  API Design<br />
                  Data Flow<br />
                  Delivery<br />
                  Frontend Runtime
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:col-span-9 lg:grid-cols-2">
              {skillGroups.map((group, groupIndex) => {
                const Icon = group.icon;

                return (
                  <motion.article
                    key={group.label}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.08, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="brutal-border bg-white"
                  >
                    <div className={cn('flex items-center justify-between gap-4 border-b-4 border-black p-4', group.accent)}>
                      <div>
                        <div className="font-mono text-xs font-black uppercase opacity-70">/{group.code}</div>
                        <h3 className="font-sans text-2xl font-black uppercase leading-none md:text-3xl">{group.label}</h3>
                      </div>
                      <Icon className="h-9 w-9 shrink-0" strokeWidth={3} />
                    </div>

                    <div className="flex min-h-[178px] flex-wrap content-start gap-3 p-4 md:p-5">
                      {group.skills.map((skill) => (
                        <SkillChip
                          key={skill}
                          skill={skill}
                          index={chipIndex++}
                          containerRef={boardRef}
                        />
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
