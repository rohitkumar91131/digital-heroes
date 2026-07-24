'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setLeads(json.data);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      setLeads(prev => prev.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
    } catch (err) { alert(err.message); } finally { setUpdatingId(null); }
  };

  const filteredLeads = leads.filter(lead => {
    const term = searchTerm.toLowerCase();
    return lead.name.toLowerCase().includes(term) || lead.email.toLowerCase().includes(term);
  });

  if (loading) return <div className="py-20 text-neutral-500 dark:text-neutral-400 font-medium text-center">Loading dashboard data...</div>;
  if (error) return <div className="p-4 bg-neutral-100 dark:bg-neutral-900 text-red-600 rounded-lg border border-red-200 dark:border-red-900/30">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search leads by name or email..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors" 
        />
      </div>

      <div className="bg-white dark:bg-[#111] rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
            <thead className="bg-neutral-50 dark:bg-[#0a0a0a]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {filteredLeads.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-neutral-500">No matching leads found.</td></tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-black dark:text-white">{lead.name}</div>
                      <div className="text-sm text-neutral-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">{lead.budget}</td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400 max-w-[250px] truncate">{lead.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select 
                        value={lead.status} 
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)} 
                        disabled={updatingId === lead._id} 
                        className="border border-neutral-300 dark:border-neutral-700 bg-transparent rounded-md px-3 py-1.5 text-sm font-medium outline-none disabled:opacity-50 appearance-none text-center cursor-pointer"
                      >
                        <option value="New" className="text-black">New</option>
                        <option value="Contacted" className="text-black">Contacted</option>
                        <option value="Closed" className="text-black">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}