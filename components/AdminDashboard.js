'use client';
import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';

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
      const res = await fetch(`/api/leads/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
      if (!res.ok) throw new Error('Failed to update status');
      setLeads((prev) => prev.map((lead) => (lead._id === id ? { ...lead, status: newStatus } : lead)));
    } catch (err) { alert(err.message); } finally { setUpdatingId(null); }
  };

  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.toLowerCase();
    return lead.name.toLowerCase().includes(term) || lead.email.toLowerCase().includes(term);
  });

  if (loading) return <div className="flex flex-col items-center justify-center py-20 text-slate-500"><Loader2 className="h-8 w-8 animate-spin mb-4" /><p>Loading leads...</p></div>;
  if (error) return <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-slate-400" /></div>
        <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name / Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredLeads.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500">No leads found matching your search.</td></tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap"><div className="font-medium text-slate-900">{lead.name}</div><div className="text-sm text-slate-500">{lead.email}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lead.budget}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{lead.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select value={lead.status} onChange={(e) => handleStatusChange(lead._id, e.target.value)} disabled={updatingId === lead._id} className="border rounded-md px-3 py-1 text-sm outline-none font-medium bg-slate-50 disabled:opacity-50">
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
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