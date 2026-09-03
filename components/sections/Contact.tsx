"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  company: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your project"),
  honeypot: z.string().max(0, "Spam detected"), // Honeypot field
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    if (data.honeypot) return; // Silent reject for bots

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          projectType: data.projectType,
          budget: data.budget,
          details: data.message,
          honeypot: data.honeypot
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSuccess(true);
      toast.success("Message sent successfully! We'll be in touch soon.");
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-[var(--color-meridian-blue)]/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
            >
              Let's build <br />
              <span className="text-[var(--color-meridian-blue)]">something great.</span>
            </motion.h2>
            <p className="text-xl text-[var(--color-meridian-muted)] mb-8 max-w-md">
              Ready to elevate your digital presence? Fill out the form, and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center">
                  <span className="font-bold">Em</span>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-meridian-muted)]">Email Us</p>
                  <a href="mailto:meridianwebco1@gmail.com" className="font-medium hover:text-[var(--color-meridian-blue)] transition-colors">meridianwebco1@gmail.com</a>
                </div>
              </div>

            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              
              {/* Honeypot field (hidden from users) */}
              <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group pt-4">
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className={cn(
                      "w-full bg-transparent border-b border-[var(--color-meridian-muted)]/30 py-4 outline-none transition-colors peer",
                      errors.name ? "border-red-500" : "focus:border-[var(--color-meridian-blue)]"
                    )}
                    placeholder=" "
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-4 text-[var(--color-meridian-muted)] transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[var(--color-meridian-blue)] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text"
                  >
                    Your Name *
                  </label>
                  {errors.name && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.name.message}</p>}
                </div>

                <div className="relative group pt-4">
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className={cn(
                      "w-full bg-transparent border-b border-[var(--color-meridian-muted)]/30 py-4 outline-none transition-colors peer",
                      errors.email ? "border-red-500" : "focus:border-[var(--color-meridian-blue)]"
                    )}
                    placeholder=" "
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-4 text-[var(--color-meridian-muted)] transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[var(--color-meridian-blue)] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text"
                  >
                    Email Address *
                  </label>
                  {errors.email && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.email.message}</p>}
                </div>

                <div className="relative group pt-4">
                  <select
                    {...register("projectType")}
                    id="projectType"
                    className={cn(
                      "w-full bg-transparent border-b border-[var(--color-meridian-muted)]/30 py-4 outline-none transition-colors focus:border-[var(--color-meridian-blue)] appearance-none",
                      errors.projectType ? "border-red-500" : ""
                    )}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-[var(--background)] text-[var(--color-meridian-muted)]">Select Project Type *</option>
                    <option value="web-development" className="bg-[var(--background)]">Web Development</option>
                    <option value="ecommerce" className="bg-[var(--background)]">E-Commerce</option>
                    <option value="ui-ux-design" className="bg-[var(--background)]">UI/UX Design</option>
                    <option value="seo" className="bg-[var(--background)]">SEO & Marketing</option>
                    <option value="other" className="bg-[var(--background)]">Other</option>
                  </select>
                  {errors.projectType && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.projectType.message}</p>}
                </div>

                <div className="relative group pt-4">
                  <select
                    {...register("budget")}
                    id="budget"
                    className={cn(
                      "w-full bg-transparent border-b border-[var(--color-meridian-muted)]/30 py-4 outline-none transition-colors focus:border-[var(--color-meridian-blue)] appearance-none",
                      errors.budget ? "border-red-500" : ""
                    )}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-[var(--background)] text-[var(--color-meridian-muted)]">Select Budget Range *</option>
                    <option value="<5k" className="bg-[var(--background)]">Less than $5,000</option>
                    <option value="5k-10k" className="bg-[var(--background)]">$5,000 - $10,000</option>
                    <option value="10k-25k" className="bg-[var(--background)]">$10,000 - $25,000</option>
                    <option value=">25k" className="bg-[var(--background)]">$25,000+</option>
                  </select>
                  {errors.budget && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.budget.message}</p>}
                </div>
              </div>

              <div className="relative group pt-4">
                <input
                  {...register("company")}
                  type="text"
                  id="company"
                  className="w-full bg-transparent border-b border-[var(--color-meridian-muted)]/30 py-4 outline-none transition-colors focus:border-[var(--color-meridian-blue)] peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="company" 
                  className="absolute left-0 top-8 text-[var(--color-meridian-muted)] transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--color-meridian-blue)] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text"
                >
                  Company (Optional)
                </label>
              </div>

              <div className="relative group pt-4">
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  className={cn(
                    "w-full bg-transparent border-b border-[var(--color-meridian-muted)]/30 py-4 outline-none transition-colors peer resize-none",
                    errors.message ? "border-red-500" : "focus:border-[var(--color-meridian-blue)]"
                  )}
                  placeholder=" "
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-8 text-[var(--color-meridian-muted)] transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--color-meridian-blue)] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text"
                >
                  Project Details *
                </label>
                {errors.message && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.message.message}</p>}
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="group relative w-full overflow-hidden rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium py-4 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : isSuccess ? (
                      "Message Sent!"
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                  {!isSubmitting && !isSuccess && (
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
                  )}
                </button>
              </div>
            </form>

            {/* Success Overlay Animation */}
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-50 glass flex flex-col items-center justify-center text-center p-8 bg-[var(--background)]/80 backdrop-blur-xl rounded-3xl"
              >
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Received!</h3>
                <p className="text-[var(--color-meridian-muted)]">We've got your message and will be in touch shortly.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
