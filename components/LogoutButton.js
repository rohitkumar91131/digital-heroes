'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LogOut, Loader2 } from 'lucide-react';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    // JWT session clear karega aur login par bhej dega
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-white rounded-lg text-sm font-medium transition-colors border border-neutral-200 dark:border-neutral-800 disabled:opacity-70 outline-none"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}