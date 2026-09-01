'use client';

import { useI18n } from './i18n-provider';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { FormField } from './form-field';
import { SectionHeader } from './section-header';
import { useFormSubmit } from '@/hooks/use-form-submit';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.email({ message: 'Invalid email address.' }),
  company: z.string().min(2, { message: 'Company name is required.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export function QuoteForm() {
  const { t } = useI18n();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isSuccess, onSubmit } = useFormSubmit(reset);

  return (
    <section
      id="quote"
      className="py-24 relative overflow-hidden bg-[#01071B] border-t border-white/5"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        <SectionHeader title={t.quote.title} subtitle={t.quote.description} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#01071B] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-medium mb-2 text-white/90">
                {t.quote.form.success}
              </h3>
              <p className="text-white/50 font-light">
                We will get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="name"
                  label={t.quote.form.name}
                  placeholder="John Doe"
                  error={errors.name}
                  {...register('name')}
                />
                <FormField
                  id="email"
                  type="email"
                  label={t.quote.form.email}
                  placeholder="john@example.com"
                  error={errors.email}
                  {...register('email')}
                />
              </div>

              <FormField
                id="company"
                label={t.quote.form.company}
                placeholder="Acme Inc."
                error={errors.company}
                {...register('company')}
              />

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white/70"
                >
                  {t.quote.form.message}
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none font-light"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-medium rounded-lg px-8 py-4 hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  t.quote.form.submit
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
