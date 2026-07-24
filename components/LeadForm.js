'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema } from '@/lib/validations';
import { CheckCircle2, Loader2 } from 'lucide-react'; // <-- Added Loader2

export default function LeadForm() {
  const [serverError, setServerError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Submission failed.');

      reset();
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="relative">
      {/* Top Right Fixed Toast */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-50 bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-lg flex items-center gap-3 shadow-2xl transition-all">
          <CheckCircle2 className="h-5 w-5" />
          <p className="font-medium text-sm">Inquiry submitted successfully!</p>
        </div>
      )}

      <div className="text-center mb-8">
        <img src="/assets/logo.png" alt="LeadDesk Mini" className="w-12 h-12 mx-auto mb-4 object-contain" />
        <h2 className="text-2xl font-bold tracking-tight">Start Your Project</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm">Enter your details and we will respond shortly.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {serverError && (
          <div className="p-3 bg-neutral-100 dark:bg-neutral-900 text-red-600 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-900/30">
            {serverError}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">Full Name</label>
          <input {...register('name')} type="text" className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors" disabled={isSubmitting} />
          {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">Email</label>
          <input {...register('email')} type="email" className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors" disabled={isSubmitting} />
          {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">Budget Range</label>
          <select {...register('budget')} className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors appearance-none" disabled={isSubmitting}>
            <option value="" className="text-black">Select a budget...</option>
            <option value="Under $1,000" className="text-black">Under $1,000</option>
            <option value="$1,000–$5,000" className="text-black">$1,000–$5,000</option>
            <option value="$5,000–$10,000" className="text-black">$5,000–$10,000</option>
            <option value="$10,000+" className="text-black">$10,000+</option>
          </select>
          {errors.budget && <p className="mt-1.5 text-sm text-red-500">{errors.budget.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">Project Message</label>
          <textarea {...register('message')} rows={4} className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors resize-none" disabled={isSubmitting} />
          {errors.message && <p className="mt-1.5 text-sm text-red-500">{errors.message.message}</p>}
        </div>

        {/* Updated Button with Shimmer + Spinner */}
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className={`relative w-full font-semibold py-3 px-4 rounded-lg mt-2 transition-all overflow-hidden ${
            isSubmitting 
              ? 'bg-neutral-800 text-neutral-400 dark:bg-neutral-200 dark:text-neutral-500 cursor-wait' 
              : 'bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200'
          }`}
        >
          {/* Shimmer Effect */}
          {isSubmitting && (
            <div 
              className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent animate-shimmer"
              style={{ width: '100%' }}
            />
          )}
          
          {/* Text and Spinner */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Inquiry...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </span>
        </button>
      </form>
    </div>
  );
}