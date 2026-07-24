'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema } from '@/lib/validations';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function LeadForm() {
  const [serverError, setServerError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong.');
      reset();
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="relative">
      {showSuccessToast && (
        <div className="absolute -top-4 left-0 right-0 bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-3 border border-green-200 mb-6 shadow-sm z-10 transition-all">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p className="font-medium text-sm">Inquiry submitted successfully!</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {serverError && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">{serverError}</div>}
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input {...register('name')} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input {...register('email')} type="email" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Budget Range</label>
          <select {...register('budget')} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option value="">Select a budget...</option>
            <option value="Under $1,000">Under $1,000</option>
            <option value="$1,000–$5,000">$1,000–$5,000</option>
            <option value="$5,000–$10,000">$5,000–$10,000</option>
            <option value="$10,000+">$10,000+</option>
          </select>
          {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Project Message</label>
          <textarea {...register('message')} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center gap-2">
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}