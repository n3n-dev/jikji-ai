import type { InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  theme?: 'dark' | 'light';
}

export function FormField({
  label,
  error,
  theme = 'dark',
  id,
  ...props
}: FormFieldProps) {
  const inputClass =
    theme === 'dark'
      ? 'w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-light'
      : 'w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all';

  const labelClass =
    theme === 'dark'
      ? 'text-sm font-medium text-white/70'
      : 'text-sm font-medium text-black/80';

  return (
    <div className="space-y-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} className={inputClass} {...props} />
      {error && (
        <p
          className={`text-xs mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500 text-sm'}`}
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
