'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { X, Calendar, DollarSign, Mail, User } from 'lucide-react';

export default function LeadModal({ leads }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const leadId = searchParams.get('leadid');

  // Agar URL mein leadid nahi hai ya leads load nahi hue, toh kuch mat dikhao
  if (!leadId || leads.length === 0) return null;

  const lead = leads.find((l) => l._id === leadId);
  if (!lead) return null;

  const closeModal = () => {
    // URL se query param hata do (bina page refresh kiye)
    router.push(pathname, { scroll: false });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-[#111] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
          <h3 className="text-lg font-bold text-black dark:text-white">Lead Details</h3>
          <button 
            onClick={closeModal}
            className="p-2 text-neutral-400 hover:text-black dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-full transition-colors outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                <User className="w-4 h-4" /> Client Name
              </div>
              <p className="text-base font-semibold text-black dark:text-white">{lead.name}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                <Mail className="w-4 h-4" /> Email Address
              </div>
              <p className="text-base font-semibold text-black dark:text-white">{lead.email}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                <DollarSign className="w-4 h-4" /> Budget
              </div>
              <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium rounded-full border border-green-200 dark:border-green-900/30">
                {lead.budget}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                <Calendar className="w-4 h-4" /> Submission Date
              </div>
              <p className="text-base font-semibold text-black dark:text-white">
                {new Date(lead.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="text-sm font-medium text-neutral-500 mb-3">Project Message</h4>
            <div className="bg-neutral-50 dark:bg-[#0a0a0a] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 max-h-[300px] overflow-y-auto">
              <p className="text-black dark:text-neutral-300 text-sm whitespace-pre-wrap leading-relaxed">
                {lead.message}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}