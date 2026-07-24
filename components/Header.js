'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Home, LayoutDashboard, Menu, X, Sun, Moon } from 'lucide-react';
import gsap from 'gsap';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg tracking-tight">LeadDesk Mini</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/admin" className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity">
            <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
          </Link>
          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <button onClick={toggleMenu} className="p-2 -mr-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav (GSAP Animated) */}
      <div ref={menuRef} className="md:hidden overflow-hidden h-0 opacity-0 bg-white dark:bg-[#0a0a0a] border-b border-neutral-200 dark:border-neutral-800">
        <div className="px-6 py-4 flex flex-col gap-4">
          <Link href="/" onClick={toggleMenu} className="flex items-center gap-3 text-sm font-medium p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link href="/admin" onClick={toggleMenu} className="flex items-center gap-3 text-sm font-medium p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <LayoutDashboard className="w-5 h-5" /> Admin Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}