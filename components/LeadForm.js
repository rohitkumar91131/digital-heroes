'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema } from '@/lib/validations';
import { CheckCircle2 } from 'lucide-react';

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
          <input {...register('name')} type="text" className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors" />
          {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">Email</label>
          <input {...register('email')} type="email" className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors" />
          {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">Budget Range</label>
          <select {...register('budget')} className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors appearance-none">
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
          <textarea {...register('message')} rows={4} className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors resize-none" />
          {errors.message && <p className="mt-1.5 text-sm text-red-500">{errors.message.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white dark:bg-white dark:text-black font-semibold py-3 px-4 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-70 mt-2">
          {isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}