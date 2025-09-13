import { useState } from 'react';
import type { Lead, Opportunity } from '../types';

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const convertLeadToOpportunity = (leadToConvert: Lead) => {
    const newOpportunity: Opportunity = {
      id: Date.now(),
      name: `${leadToConvert.name}'s Opportunity`,
      stage: 'Discovery',
      accountName: leadToConvert.company,
      amount: 50000,
    };

    setOpportunities(prev => [...prev, newOpportunity]);
    return newOpportunity;
  };

  return {
    opportunities,
    setOpportunities,
    convertLeadToOpportunity
  };
};