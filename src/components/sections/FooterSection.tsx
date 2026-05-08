import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';
import { ArrowUpRight } from 'lucide-react';

export const FooterSection = () => {
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <footer className="bg-black text-[var(--color-bg)] relative overflow-hidden border-t-8 border-[var(--color-bg)]">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y-8 md:divide-y-0 md:divide-x-8 divide-[var(--color-bg)] border-b-8 border-[var(--color-bg)]">
          {/* Main Brand Block */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 p-8 lg:p-16 flex flex-col justify-between min-h-[400px]">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black font-sans uppercase leading-none tracking-tighter text-[var(--color-accent-2)]">
              PATRICK<br/>OLIVER
            </h2>
            <div className="mt-8 font-mono text-xl uppercase max-w-sm">
              Software Developer <br/> Fullstack (AI-First) <br/> DevOps & Backend
            </div>
          </div>

          {/* Social Links Block */}
          <div className="p-8 lg:p-16 flex flex-col justify-between bg-[var(--color-bg)] text-black">
            <div>
              <h3 className="font-mono text-2xl font-bold uppercase mb-8 pb-4 border-b-4 border-black">Network_Links</h3>
              <ul className="flex flex-col gap-6 font-sans text-3xl md:text-4xl font-black uppercase">
                <li>
                  <CursorHoverBlock>
                    <a href="https://github.com/Geoxylitiz" className="flex items-center justify-between group">
                      <span className="group-hover:text-[var(--color-accent-2)] transition-colors">GitHub</span>
                      <ArrowUpRight className="w-8 h-8 transform group-hover:scale-125 group-hover:rotate-12 transition-transform" />
                    </a>
                  </CursorHoverBlock>
                </li>
                <li>
                  <CursorHoverBlock>
                    <a href="https://www.linkedin.com/in/geoxylitiz/" className="flex items-center justify-between group">
                      <span className="group-hover:text-[var(--color-accent-2)] transition-colors">LinkedIn</span>
                      <ArrowUpRight className="w-8 h-8 transform group-hover:scale-125 group-hover:rotate-12 transition-transform" />
                    </a>
                  </CursorHoverBlock>
                </li>
                <li>
                  <CursorHoverBlock>
                    <a href="https://www.instagram.com/olive_oil.8/" className="flex items-center justify-between group">
                      <span className="group-hover:text-[var(--color-accent-2)] transition-colors">Instagram</span>
                      <ArrowUpRight className="w-8 h-8 transform group-hover:scale-125 group-hover:rotate-12 transition-transform" />
                    </a>
                  </CursorHoverBlock>
                </li>
              </ul>
            </div>
          </div>

          {/* Meta Block */}
          <div className="p-8 lg:p-16 flex flex-col justify-between">
            <div>
               <h3 className="font-mono text-2xl font-bold uppercase mb-8 text-[var(--color-accent-1)]">Status_</h3>
               <p className="font-mono text-lg uppercase leading-relaxed text-[var(--color-bg)]">
                 Available for freelance<br/>
                 Relocation: Open<br/>
                 Timezone: UTC+8
               </p>
            </div>
            
            <div className="mt-12 font-mono text-sm font-bold uppercase flex items-center justify-between gap-2 border-t-4 border-[var(--color-bg)] pt-4">
              <span className="text-[var(--color-bg)]">&copy; {new Date().getFullYear()}</span>
              <CursorHoverBlock>
                <button 
                  onClick={() => setShowTerminal(true)}
                  className="px-4 py-2 bg-[var(--color-accent-1)] text-black font-bold hover:bg-white transition-colors cursor-none"
                >
                  [SYS_LOG]
                </button>
              </CursorHoverBlock>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <div className="w-full max-w-3xl border-4 border-green-500 bg-black text-green-500 font-mono p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,255,0,0.5)] flex flex-col h-[60vh] relative">
              <div className="flex justify-between items-center mb-4 border-b border-green-500/50 pb-2">
                <span>admin@localhost:~</span>
                <CursorHoverBlock>
                  <button onClick={() => setShowTerminal(false)} className="text-white bg-red-600 px-2 py-1 font-bold hover:bg-red-500 transition-colors cursor-none">
                    [X] CLOSE
                  </button>
                </CursorHoverBlock>
              </div>
              <div className="flex-1 overflow-auto whitespace-pre-wrap text-sm md:text-base">
                {`> sys.get_resume(format='json')\n`}
                {`{\n  "name": "Patrick Oliver",\n  "role": "Frontend / Backend Engineer",\n  "status": "Ready for new challenges",\n  "easter_egg": "You found me!"\n}`}
                <br /><br />
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
