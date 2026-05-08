import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import { projectsData } from '../../data';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';
import { cn } from '../../lib/utils';
import { ArrowUpRight } from 'lucide-react';

const HoverImageFollow = ({ image, isVisible }: { image: string, isVisible: boolean }) => {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springConfig = { damping: 25, stiffness: 400 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible, x, y]);

  // Disable on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 w-80 h-48 brutal-border object-cover bg-white -translate-x-1/2 -translate-y-1/2"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible && image ? 1 : 0, scale: isVisible && image ? 1 : 0.8 }}
      transition={{ duration: 0.2 }}
    >
      {image ? (
        <img src={image} alt="Project preview" className="w-full h-full object-cover filter grayscale contrast-125" />
      ) : null}
    </motion.div>
  );
};

export const ProjectShowcase = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 brutal-border-b bg-[var(--color-bg)] overflow-hidden">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter mb-16"
        >
          Project_Assets
        </motion.h2>

        <div className="flex flex-col gap-12">
          {projectsData.map((project, i) => {
            const isHovered = hoveredProject === project.id;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <HoverImageFollow image={project.image} isVisible={isHovered} />

                <div className="brutal-border bg-white brutal-shadow p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group">
                  <div className="flex-1">
                    <Suspense fallback={<div />}>
                      <CursorHoverBlock>
                        <h3 className="text-4xl md:text-6xl font-black font-sans uppercase mb-4 transition-colors group-hover:text-[var(--color-accent-2)]">
                          {project.title}
                        </h3>
                      </CursorHoverBlock>
                    </Suspense>
                    <p className="font-mono text-lg max-w-2xl font-medium">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="brutal-border px-3 py-1 font-mono text-sm font-bold uppercase bg-[var(--color-bg)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div 
                    className="flex gap-4 self-start md:self-auto"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setHoveredProject(null);
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setHoveredProject(project.id);
                    }}
                  >
                    <CursorHoverBlock>
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center justify-center w-16 h-16 brutal-border bg-[var(--color-accent-1)] brutal-shadow hover:bg-black hover:text-white transition-colors">
                        <ArrowUpRight strokeWidth={3} className="w-8 h-8" />
                      </a>
                    </CursorHoverBlock>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
