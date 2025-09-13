import { useState, useEffect } from 'react';
import type { Lead } from '../types';
import { initialLeads } from '../data/mockLeads';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data fetching simulation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        setLeads(initialLeads);
      } catch (e) {
        setError('Failed to load leads data.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateLead = (updatedLead: Lead) => {
    setLeads(prevLeads =>
      prevLeads.map(lead => (lead.id === updatedLead.id ? updatedLead : lead))
    );
  };

  const removeLead = (leadId: number) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  return {
    leads,
    setLeads,
    isLoading,
    error,
    updateLead,
    removeLead
  };
};