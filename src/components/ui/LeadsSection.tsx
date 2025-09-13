import React from 'react';
import type { Lead } from '../../types';
import { leadStatuses } from '../../constants';
import { LeadsTable } from './LeadsTable';

interface LeadsSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: Lead['status'] | 'All';
  setStatusFilter: (filter: Lead['status'] | 'All') => void;
  filteredAndSortedLeads: Lead[];
  isLoading: boolean;
  error: string | null;
  onLeadSelect: (lead: Lead) => void;
}

export const LeadsSection: React.FC<LeadsSectionProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  filteredAndSortedLeads,
  isLoading,
  error,
  onLeadSelect
}) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Leads</h2>
      
      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or company..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as Lead['status'] | 'All')}
          className="w-full sm:w-auto px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="All">All Statuses</option>
          {leadStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      
      <LeadsTable 
        leads={filteredAndSortedLeads}
        isLoading={isLoading}
        error={error}
        onLeadSelect={onLeadSelect}
      />
    </div>
  );
};