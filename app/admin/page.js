import AdminDashboard from '@/components/AdminDashboard';
import LogoutButton from '@/components/LogoutButton';

export const metadata = { title: 'Admin Dashboard | LeadDesk Mini' };

export default function AdminPage() {
  return (
    <div className="py-8">
      {/* Header Section with Interactive Logout Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <LogoutButton />
      </div>

      {/* Main Dashboard Component */}
      <AdminDashboard />
    </div>
  );
}