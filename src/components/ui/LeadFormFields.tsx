import React from 'react';
import type { Lead } from '../../types';
import { leadStatuses } from '../../constants';

interface LeadFormFieldsProps {
  editableLead: Lead;
  emailError: string;
  onInputChange: (field: keyof Lead, value: string) => void;
}

export const LeadFormFields: React.FC<LeadFormFieldsProps> = ({
  editableLead,
  emailError,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email
        </label>
        <input 
          type="email" 
          value={editableLead.email}
          onChange={e => onInputChange('email', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            emailError 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-slate-300 focus:ring-blue-500'
          }`}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? 'email-error' : undefined}
        />
        {emailError && (
          <p id="email-error" className="text-red-500 text-xs mt-1">
            {emailError}
          </p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Status
        </label>
        <select 
          value={editableLead.status}
          onChange={e => onInputChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {leadStatuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};