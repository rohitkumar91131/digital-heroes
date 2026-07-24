'use client';

import { Search } from 'lucide-react';

export default function DashboardSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="relative max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-neutral-400" />
      </div>
      <input 
        type="text" 
        placeholder="Search leads by name or email..." 
        value={searchTerm} 
        onChange={(e) => onSearchChange(e.target.value)} 
        className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors" 
      />
    </div>
  );
}