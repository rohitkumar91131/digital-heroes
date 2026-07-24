'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Zap } from 'lucide-react'; // Added Zap

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Standard Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      router.refresh(); 
    }
  };

  // 1-Click Assignment Evaluator Login
  const handleTestLogin = async () => {
    setLoading(true);
    setError('');
    
    // Auto-fill values
    setEmail('admin@digitalheroes.com');
    setPassword('securepassword123');

    // Direct submit
    const res = await signIn('credentials', {
      email: 'admin@digitalheroes.com',
      password: 'securepassword123',
      redirect: false,
    });

    if (res?.error) {
      setError('Test credentials failed. Check your .env variables.');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh(); 
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#111] p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
        <div className="text-center mb-8">
          <img src="/assets/logo.png" alt="Logo" className="w-12 h-12 mx-auto mb-4 object-contain" />
          <h2 className="text-2xl font-bold tracking-tight">Admin Login</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm">Secure access to the LeadDesk dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-900/30 text-center font-medium">{error}</div>}

          <div>
            <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              disabled={loading}
              className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors disabled:opacity-50" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                disabled={loading}
                className="w-full pl-4 pr-12 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors disabled:opacity-50" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black dark:hover:text-white transition-colors outline-none disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={`relative w-full font-semibold py-3 px-4 rounded-lg mt-2 transition-all overflow-hidden ${
              loading 
                ? 'bg-neutral-800 text-neutral-400 dark:bg-neutral-200 dark:text-neutral-500 cursor-wait' 
                : 'bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200'
            }`}
          >
            {loading && (
              <div 
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent animate-shimmer"
                style={{ width: '100%' }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? 'Authenticating...' : 'Login'}
            </span>
          </button>
        </form>

        {/* 1-Click Assignment Login Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200 dark:border-neutral-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-[#111] text-neutral-400 font-medium">Assignment Evaluation</span>
          </div>
        </div>

        {/* 1-Click Login Button */}
        <button
          type="button"
          onClick={handleTestLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm font-medium text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50"
        >
          <Zap className="w-4 h-4 text-yellow-500" />
          1-Click Test Login
        </button>
      </div>
    </div>
  );
}