import React from 'react';
import type { Lead } from '../../types';

interface LeadInfoSectionProps {
  lead: Lead;
}

export const LeadInfoSection: React.FC<LeadInfoSectionProps> = ({ lead }) => {
  return (
    <div className="border-t pt-4 mt-4 space-y-2 text-sm text-slate-600">
      <p><strong>Source:</strong> {lead.source}</p>
      <p><strong>Score:</strong> {lead.score}</p>
    </div>
  );
};