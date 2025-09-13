import { useState, useEffect, useMemo } from 'react';
import type { Lead } from '../types';

export const useFilters = (leads: Lead[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Lead['status'] | 'All'>(
    () => (localStorage.getItem('miniSellerConsoleStatusFilter') as Lead['status'] | 'All') || 'All'
  );

  // LocalStorage persistence for filter
  useEffect(() => {
    localStorage.setItem('miniSellerConsoleStatusFilter', statusFilter);
  }, [statusFilter]);

  // Filtered and sorted leads
  const filteredAndSortedLeads = useMemo(() => {
    return leads
      .filter(lead => {
        const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
        const matchesSearch =
          searchTerm.trim() === '' ||
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => b.score - a.score);
  }, [leads, searchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredAndSortedLeads
  };
};