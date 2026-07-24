import AdminDashboard from '@/components/AdminDashboard';
import { signOut } from '@/auth';
import { LogOut } from 'lucide-react';

export const metadata = { title: 'Admin Dashboard | LeadDesk Mini' };

export default function AdminPage() {
  return (
    <div className="py-8">
      {/* Header Section with Logout Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        
        {/* Next.js 15 Server Action Form for Logout */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-white rounded-lg text-sm font-medium transition-colors border border-neutral-200 dark:border-neutral-800"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </form>
      </div>

      {/* Main Dashboard Component */}
      <AdminDashboard />
    </div>
  );
}