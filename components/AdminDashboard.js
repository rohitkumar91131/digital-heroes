'use client';

import { useState, useEffect } from 'react';
import DashboardSearch from './DashboardSearch';
import LeadTable from './LeadTable';
import Pagination from './Pagination';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);
  
  const ITEMS_PER_PAGE = 10;

  useEffect(() => { 
    fetchLeads(); 
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setLeads(json.data);
    } catch (err) { 
      setError(err.message); 
    } finally { 
      setLoading(false); 
    }
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
    } catch (err) { 
      alert(err.message); 
    } finally { 
      setUpdatingId(null); 
    }
  };

  // Jab bhi search term change ho, page 1 par reset kar do
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // 1. Filter Leads
  const filteredLeads = leads.filter(lead => {
    const term = searchTerm.toLowerCase();
    return lead.name.toLowerCase().includes(term) || lead.email.toLowerCase().includes(term);
  });

  // 2. Pagination Math
  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentLeads = filteredLeads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <div className="py-20 text-neutral-500 dark:text-neutral-400 font-medium text-center">Loading dashboard data...</div>;
  if (error) return <div className="p-4 bg-neutral-100 dark:bg-neutral-900 text-red-600 rounded-lg border border-red-200 dark:border-red-900/30">{error}</div>;

  return (
    <div className="space-y-6">
      <DashboardSearch searchTerm={searchTerm} onSearchChange={handleSearch} />
      
      <LeadTable 
        leads={currentLeads} 
        onStatusChange={handleStatusChange} 
        updatingId={updatingId} 
      />

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )}
    </div>
  );
}