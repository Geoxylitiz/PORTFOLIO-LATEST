import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { projectsData } from '../../data';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';
import { ArrowUpRight, Github, ImageIcon, X } from 'lucide-react';

type Project = (typeof projectsData)[number];

const getProjectImages = (project: Project) => {
  if (project.images.length > 0) {
    return project.images;
  }

  return project.image ? [project.image] : [];
};

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

const ProjectImageModal = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = project ? getProjectImages(project) : [];
  const activeImage = images[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-gallery-title"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden brutal-border bg-[var(--color-bg)] brutal-shadow"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b-4 border-black bg-[var(--color-accent-1)] p-4 md:p-5">
              <div className="min-w-0">
                <div className="font-mono text-xs font-black uppercase opacity-70">Project Gallery</div>
                <h3 id="project-gallery-title" className="font-sans text-2xl font-black uppercase leading-none tracking-tight md:text-4xl">
                  {project.title}
                </h3>
              </div>
              <CursorHoverBlock>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project gallery"
                  className="grid h-12 w-12 shrink-0 place-items-center brutal-border bg-white transition-colors hover:bg-black hover:text-white"
                >
                  <X className="h-7 w-7" strokeWidth={3} />
                </button>
              </CursorHoverBlock>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-auto p-4 md:p-5 lg:grid-cols-[1fr_220px]">
              <div className="flex min-h-[320px] items-center justify-center brutal-border bg-white p-3 md:min-h-[520px]">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={`${project.title} screenshot ${activeIndex + 1}`}
                    className="max-h-[68vh] w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-4 bg-[var(--color-bg)] p-8 text-center">
                    <ImageIcon className="h-16 w-16" strokeWidth={3} />
                    <div className="font-mono text-sm font-black uppercase leading-relaxed md:text-base">
                      No gallery images added yet
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-x-visible lg:overflow-y-auto">
                {images.length > 0 ? images.map((image, index) => (
                  <CursorHoverBlock key={image}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-24 w-36 shrink-0 overflow-hidden brutal-border bg-white p-1 transition-transform lg:h-28 lg:w-full ${
                        activeIndex === index ? 'translate-x-1 translate-y-1 shadow-none' : 'brutal-shadow'
                      }`}
                      aria-label={`View ${project.title} screenshot ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </CursorHoverBlock>
                )) : (
                  <div className="brutal-border bg-white p-4 font-mono text-sm font-black uppercase">
                    Add image URLs in projectsData.images.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ProjectShowcase = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
            const projectImages = getProjectImages(project);
            
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

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  className="brutal-border bg-white brutal-shadow p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group cursor-pointer focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-2)]"
                  aria-label={`Open ${project.title} image gallery`}
                >
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
                    <div className="mt-5 font-mono text-sm font-black uppercase text-[var(--color-accent-2)]">
                      {projectImages.length > 0 ? `${projectImages.length} gallery image${projectImages.length === 1 ? '' : 's'}` : 'gallery pending'}
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    
                    {project.githubLink ? (
                      <CursorHoverBlock>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${project.title} GitHub repository`}
                          className="flex h-16 w-16 items-center justify-center brutal-border bg-white brutal-shadow transition-colors hover:bg-black hover:text-white"
                        >
                          <Github strokeWidth={3} className="h-8 w-8" />
                        </a>
                      </CursorHoverBlock>
                    ) : null}
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
      <ProjectImageModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
