import AdminDashboard from '@/components/AdminDashboard';

export const metadata = { title: 'Admin Dashboard | LeadDesk' };

export default function AdminPage() {
  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <AdminDashboard />
    </div>
  );
}