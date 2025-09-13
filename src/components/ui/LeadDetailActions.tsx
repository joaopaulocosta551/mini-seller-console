import React from 'react';
import type { Lead } from '../../types';

interface LeadDetailActionsProps {
  lead: Lead;
  onConvert: (lead: Lead) => void;
  onSave: () => void;
  onCancel: () => void;
  isFormValid: boolean;
}

export const LeadDetailActions: React.FC<LeadDetailActionsProps> = ({
  lead,
  onConvert,
  onSave,
  onCancel,
  isFormValid
}) => {
  return (
    <div className="p-6 bg-slate-50 border-t flex justify-between items-center">
      <button 
        onClick={() => onConvert(lead)}
        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
      >
        Convert to Opportunity
      </button>
      
      <div className="flex gap-2">
        <button 
          onClick={onCancel}
          className="px-4 py-2 bg-white border border-slate-300 font-semibold rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={onSave}
          disabled={!isFormValid}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};