import AdminDashboard from '@/components/AdminDashboard';

export const metadata = { title: 'Lead Dashboard | LeadDesk Mini' };

export default function AdminPage() {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Lead Dashboard</h2>
      <AdminDashboard />
    </div>
  );
}