import React from 'react';
import type { Lead } from '../../types';

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  onLeadSelect: (lead: Lead) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  isLoading,
  error,
  onLeadSelect
}) => {
  if (isLoading) {
    return <div className="text-center py-10">Loading leads...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (leads.length === 0) {
    return <div className="text-center py-10 text-slate-500">No leads found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-slate-200 text-sm text-slate-600">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3 hidden sm:table-cell">Company</th>
            <th className="p-3 hidden md:table-cell">Status</th>
            <th className="p-3 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr 
              key={lead.id} 
              onClick={() => onLeadSelect(lead)}
              className="border-b border-slate-200 hover:bg-blue-50 hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              <td className="p-3 font-medium">{lead.name}</td>
              <td className="p-3 hidden sm:table-cell text-slate-600">{lead.company}</td>
              <td className="p-3 hidden md:table-cell">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                  lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                  lead.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-slate-200 text-slate-700'
                }`}>
                  {lead.status}
                </span>
              </td>
              <td className="p-3 text-right font-semibold text-blue-600">{lead.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};