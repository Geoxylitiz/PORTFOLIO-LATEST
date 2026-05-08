import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { CursorHoverBlock } from '../animations/CursorHoverBlock';
import { cn } from '../../lib/utils';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const ContactSection = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const onSubmit = async (data: ContactFormData) => {
    // Simulate network request
    setFormStatus('sending');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
    console.log("Form data submitted:", data);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-black text-white brutal-border-b">
      <div className="container mx-auto max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter mb-16 text-[var(--color-bg)]"
        >
          Initiate_Handshake
        </motion.h2>

        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           viewport={{ once: true }}
           className="brutal-border bg-[var(--color-bg)] text-black p-8 md:p-12 brutal-shadow"
           style={{ "--color-border": "#FF4D00" } as any} // Local override for contrast
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono font-bold text-xl uppercase">01. Entity_Name</label>
              <CursorHoverBlock>
                <input 
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="JOHN DOE"
                  className={cn(
                    "w-full brutal-border p-4 font-mono text-xl bg-white focus:bg-[var(--color-accent-1)] focus:outline-none transition-colors cursor-none",
                    errors.name && "border-red-500"
                  )}
                />
              </CursorHoverBlock>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono font-bold text-xl uppercase">02. Return_Address</label>
              <CursorHoverBlock>
                <input 
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="JOHNDOE@EXAMPLE.COM"
                  className={cn(
                    "w-full brutal-border p-4 font-mono text-xl bg-white focus:bg-[var(--color-accent-1)] focus:outline-none transition-colors cursor-none",
                    errors.email && "border-red-500"
                  )}
                />
              </CursorHoverBlock>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono font-bold text-xl uppercase">03. Payload</label>
              <CursorHoverBlock>
                <textarea 
                  id="message"
                  {...register("message", { required: true })}
                  placeholder="ENTER YOUR MESSAGE HERE..."
                  rows={5}
                  className={cn(
                    "w-full brutal-border p-4 font-mono text-xl bg-white focus:bg-[var(--color-accent-1)] focus:outline-none transition-colors resize-none cursor-none",
                    errors.message && "border-red-500"
                  )}
                />
              </CursorHoverBlock>
            </div>

            <CursorHoverBlock>
              <motion.button
                type="submit"
                disabled={formStatus !== 'idle'}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full brutal-border p-6 font-sans font-black text-3xl uppercase brutal-shadow mt-4 transition-colors cursor-none",
                  formStatus === 'idle' ? "bg-[var(--color-accent-2)] text-white hover:bg-black" : 
                  formStatus === 'sending' ? "bg-[var(--color-accent-1)] text-black" : 
                  "bg-green-500 text-white"
                )}
              >
                {formStatus === 'idle' ? 'Transmit' : formStatus === 'sending' ? 'Transmitting...' : 'Transmission_Success'}
              </motion.button>
            </CursorHoverBlock>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
