import React from 'react';
import type { Opportunity } from '../../types';

interface OpportunitiesSectionProps {
  opportunities: Opportunity[];
}

export const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({
  opportunities
}) => {
  return (
    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
      <h2 className="text-xl font-semibold mb-4">Opportunities</h2>
      {opportunities.length === 0 ? (
        <p className="text-slate-500">No opportunities yet.</p>
      ) : (
        <ul className="space-y-3">
          {opportunities.map(op => (
            <li key={op.id} className="p-3 bg-slate-50 rounded-md">
              <p className="font-semibold">{op.name}</p>
              <p className="text-sm text-slate-600">{op.accountName} - {op.stage}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};