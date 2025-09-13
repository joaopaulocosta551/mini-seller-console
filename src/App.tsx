import { useState } from 'react';
import type { Lead } from './types';
import { Header } from './components/layout/Header';
import { LeadsSection } from './components/ui/LeadsSection';
import { OpportunitiesSection } from './components/ui/OpportunitiesSection';
import { LeadDetailPanel } from './components/ui/LeadDetailPanel';
import { useLeads } from './hooks/useLeads';
import { useOpportunities } from './hooks/useOpportunities';
import { useFilters } from './hooks/useFilters';

export default function App() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Custom hooks
  const { leads, isLoading, error, updateLead, removeLead } = useLeads();
  const { opportunities, convertLeadToOpportunity } = useOpportunities();
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredAndSortedLeads
  } = useFilters(leads);

  // Event handlers
  const handleUpdateLead = (updatedLead: Lead) => {
    updateLead(updatedLead);
    setSelectedLead(null);
  };

  const handleConvertToOpportunity = (leadToConvert: Lead) => {
    convertLeadToOpportunity(leadToConvert);
    removeLead(leadToConvert.id);
    setSelectedLead(null);
  };

  return (
    <div className="bg-slate-500 min-h-screen font-sans text-slate-800">
      <Header />

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <LeadsSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            filteredAndSortedLeads={filteredAndSortedLeads}
            isLoading={isLoading}
            error={error}
            onLeadSelect={setSelectedLead}
          />
          
          <OpportunitiesSection opportunities={opportunities} />
        </div>
      </main>

      <LeadDetailPanel 
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSave={handleUpdateLead}
        onConvert={handleConvertToOpportunity}
      />
    </div>
  );
}

