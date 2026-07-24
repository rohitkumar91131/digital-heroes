'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LeadTable({ leads, onStatusChange, updatingId }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleRowClick = (leadId) => {
    // Add ?leadid= to URL
    router.push(`${pathname}?leadid=${leadId}`, { scroll: false });
  };

  return (
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
            {leads.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-12 text-center text-neutral-500">No matching leads found.</td></tr>
            ) : (
              leads.map((lead) => (
                <tr 
                  key={lead._id} 
                  onClick={() => handleRowClick(lead._id)}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors cursor-pointer"
                >
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
                      onClick={(e) => e.stopPropagation()} // <-- Row click rokne ke liye
                      onChange={(e) => onStatusChange(lead._id, e.target.value)} 
                      disabled={updatingId === lead._id} 
                      className="border border-neutral-300 dark:border-neutral-700 bg-transparent rounded-md px-3 py-1.5 text-sm font-medium outline-none disabled:opacity-50 appearance-none text-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
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
  );
}