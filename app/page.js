import LeadForm from '@/components/LeadForm';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-lg bg-white dark:bg-[#111] p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-black/5 dark:shadow-none">
        <LeadForm />
      </div>
    </div>
  );
}