import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, BadgeCheck, FileCheck2 } from 'lucide-react';
import { certificatesData } from '../../data';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';
import { cn } from '../../lib/utils';

const issuerCounts = certificatesData.reduce<Record<string, number>>((counts, certificate) => {
  counts[certificate.issuer] = (counts[certificate.issuer] ?? 0) + 1;
  return counts;
}, {});

const CertificateCard = ({
  certificate,
  index,
}: {
  certificate: (typeof certificatesData)[number];
  index: number;
}) => {
  const Icon = certificate.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      viewport={{ once: true, margin: '-80px' }}
      className="group h-full"
    >
      <CursorHoverBlock className="h-full">
        <a
          href={certificate.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${certificate.title} certificate`}
          className="flex h-full min-h-[264px] flex-col brutal-border bg-white brutal-shadow transition-colors focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-2)]"
        >
          <div className={cn('flex items-start justify-between gap-4 border-b-4 border-black p-4', certificate.accent)}>
            <div className="min-w-0">
              <div className="font-mono text-xs font-black uppercase opacity-75">/{certificate.code}</div>
              <div className="mt-1 font-mono text-sm font-black uppercase leading-tight">
                {certificate.category}
              </div>
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center brutal-border bg-[var(--color-bg)] text-black">
              <Icon className="h-8 w-8" strokeWidth={3} />
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 md:p-6">
            <h3 className="font-sans text-2xl font-black uppercase leading-none tracking-tight transition-colors group-hover:text-[var(--color-accent-2)] md:text-3xl">
              {certificate.title}
            </h3>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="brutal-border bg-[var(--color-bg)] px-3 py-1 font-mono text-xs font-black uppercase">
                {certificate.issuer}
              </span>
              <span className="brutal-border bg-[var(--color-accent-1)] px-3 py-1 font-mono text-xs font-black uppercase">
                {certificate.status}
              </span>
            </div>

            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              <div className="font-mono text-xs font-black uppercase leading-relaxed opacity-70">
                Credential URL
                <span className="block text-[var(--color-accent-2)]">Public Proof</span>
              </div>
              <span className="grid h-14 w-14 shrink-0 place-items-center brutal-border bg-black text-white transition-colors group-hover:bg-[var(--color-accent-2)] group-hover:text-black">
                <ArrowUpRight className="h-7 w-7" strokeWidth={3} />
              </span>
            </div>
          </div>
        </a>
      </CursorHoverBlock>
    </motion.article>
  );
};

export const SkillsPhysics = () => {
  return (
    <section id="skills" className="bg-[var(--color-bg)] px-6 py-24 brutal-border-b md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="font-sans text-5xl font-black uppercase leading-none tracking-tighter md:text-7xl">
              Credential_Ledger
            </h2>
            <p className="mt-5 max-w-3xl font-mono text-base font-bold uppercase leading-relaxed md:text-lg">
              Verified proof across security, cloud, AI, and database foundations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            viewport={{ once: true, margin: '-100px' }}
            className="brutal-border bg-[var(--color-accent-1)] p-5 brutal-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <FileCheck2 className="h-12 w-12 shrink-0" strokeWidth={3} />
              <div className="text-right font-mono text-sm font-black uppercase leading-tight">
                Certificates
                <span className="block">Verified Links</span>
              </div>
            </div>
            <div className="mt-8 font-sans text-6xl font-black uppercase leading-none tracking-tighter">
              {certificatesData.length}
              <span className="block text-2xl md:text-3xl">Public Signals</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-120px' }}
          className="relative overflow-hidden brutal-border bg-[var(--color-bg)] p-4 brutal-shadow md:p-6"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-20 invert pointer-events-none" />
          <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-12">
            <aside className="brutal-border bg-black p-5 text-white lg:col-span-3">
              <div className="flex h-full min-h-[340px] flex-col justify-between gap-10">
                <div>
                  <BadgeCheck className="mb-6 h-12 w-12 text-[var(--color-accent-1)]" strokeWidth={3} />
                  <div className="font-mono text-sm font-black uppercase text-[var(--color-accent-1)]">
                    Issuer Index
                  </div>
                  <div className="mt-5 space-y-3">
                    {Object.entries(issuerCounts).map(([issuer, count]) => (
                      <div key={issuer} className="flex items-center justify-between gap-4 border-b-4 border-white pb-2 font-mono text-sm font-black uppercase">
                        <span>{issuer}</span>
                        <span className="text-[var(--color-accent-1)]">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t-4 border-white pt-5 font-mono text-sm font-bold uppercase leading-relaxed">
                  Security Proof<br />
                  Cloud Foundation<br />
                  Database Literacy<br />
                  AI Fundamentals
                </div>
              </div>
            </aside>

            <div className="grid grid-cols-1 gap-4 lg:col-span-9 lg:grid-cols-2">
              {certificatesData.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
