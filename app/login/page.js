'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Credentials auth.js ki authorize() function mein jayenge
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh(); // Refresh taaki middleware naya state pick kar le
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-md bg-white dark:bg-[#111] p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
        <div className="text-center mb-8">
          <img src="/assets/logo.png" alt="Logo" className="w-12 h-12 mx-auto mb-4 object-contain" />
          <h2 className="text-2xl font-bold tracking-tight">Admin Login</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm">Secure access to the LeadDesk dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-900/30 text-center font-medium">{error}</div>}

          <div>
            <label className="block text-sm font-medium mb-1.5">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-black text-white dark:bg-white dark:text-black font-semibold py-3 px-4 rounded-lg disabled:opacity-70 mt-2 transition-colors">
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}