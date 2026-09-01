'use client';

import { useI18n } from '@/components/i18n-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FormField } from '@/components/form-field';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useFormSubmit } from '@/hooks/use-form-submit';

const formSchema = z.object({
  company: z.string().min(2, { message: 'Company name is required.' }),
  industry: z.string().min(2, { message: 'Industry is required.' }),
  name: z.string().min(2, { message: 'Name is required.' }),
  contact: z.string().min(8, { message: 'Contact number is required.' }),
  email: z.email({ message: 'Invalid email address.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function SupportPage() {
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
    <main className="min-h-screen bg-white text-black selection:bg-black/10 flex flex-col">
      <Header />

      <section className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-bold tracking-tight mb-6 leading-tight whitespace-pre-line"
            >
              {t.support_page.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-black/60 mb-8"
            >
              {t.support_page.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-3 bg-black/5 rounded-lg border border-black/10 font-medium text-black/80"
            >
              {t.support_page.highlight}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-black/10 shadow-xl"
            id="promotion"
          >
            <h2 className="text-2xl font-bold mb-8">{t.support_page.form.title}</h2>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />
                <h3 className="text-2xl font-semibold mb-2">{t.support_page.form.success_title}</h3>
                <p className="text-black/60">{t.support_page.form.success_desc}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    id="company"
                    label={t.support_page.form.company}
                    placeholder="Placeholder"
                    error={errors.company}
                    theme="light"
                    {...register('company')}
                  />
                  <FormField
                    id="industry"
                    label={t.support_page.form.industry}
                    placeholder="Placeholder"
                    error={errors.industry}
                    theme="light"
                    {...register('industry')}
                  />
                </div>

                <FormField
                  id="name"
                  label={t.support_page.form.name}
                  placeholder="Placeholder"
                  error={errors.name}
                  theme="light"
                  {...register('name')}
                />

                <FormField
                  id="contact"
                  label={t.support_page.form.contact}
                  placeholder="Placeholder"
                  error={errors.contact}
                  theme="light"
                  {...register('contact')}
                />

                <FormField
                  id="email"
                  type="email"
                  label={t.support_page.form.email}
                  placeholder="Placeholder"
                  error={errors.email}
                  theme="light"
                  {...register('email')}
                />

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-[#FF3B30] text-white font-semibold rounded-lg hover:bg-[#FF3B30]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t.support_page.form.submit}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
