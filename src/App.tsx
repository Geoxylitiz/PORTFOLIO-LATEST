/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CursorProvider } from './contexts/CursorContext';
import { MagneticCursor } from './components/animations/MagneticCursor';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectShowcase } from './components/sections/ProjectShowcase';
import { SkillsPhysics } from './components/sections/SkillsPhysics';
import { ContactSection } from './components/sections/ContactSection';
import { FooterSection } from './components/sections/FooterSection';

export default function App() {
  return (
    <CursorProvider>
      <div className="relative w-full overflow-x-hidden selection:bg-[var(--color-accent-1)] selection:text-black">
        <MagneticCursor />
        
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectShowcase />
          <SkillsPhysics />
          <ContactSection />
        </main>

        <FooterSection />
      </div>
    </CursorProvider>
  );
}
