import LeadForm from '@/components/LeadForm';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3 text-slate-800">Start Your Project</h2>
        <p className="text-slate-600 max-w-md mx-auto">Submit your project inquiry below. Our team will review your details and get back to you shortly.</p>
      </div>
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <LeadForm />
      </div>
    </div>
  );
}