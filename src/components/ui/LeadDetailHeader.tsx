import React from 'react';
import type { Lead } from '../../types';

interface LeadDetailHeaderProps {
  lead: Lead;
  onClose: () => void;
}

export const LeadDetailHeader: React.FC<LeadDetailHeaderProps> = ({
  lead,
  onClose
}) => {
  return (
    <div className="p-6 border-b">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{lead.name}</h3>
        <button 
          onClick={onClose} 
          className="p-1 rounded-full hover:bg-slate-200 transition-colors"
          aria-label="Close panel"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
      <p className="text-slate-600">{lead.company}</p>
    </div>
  );
};