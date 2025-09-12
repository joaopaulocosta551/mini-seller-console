import { useState, useEffect } from "react";
import type { Lead, LeadDetailPanelProps } from "../../types";

import { emailRegex, leadStatuses } from "../../constants";


export function LeadDetailPanel({ lead, onClose, onSave, onConvert }: LeadDetailPanelProps) {
  const [editableLead, setEditableLead] = useState<Lead | null>(null);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (lead) {
      setEditableLead({ ...lead });
      setEmailError('');
    }
  }, [lead]);

  if (!lead || !editableLead) return null;

  const handleInputChange = (field: keyof Lead, value: string) => {
    setEditableLead(prev => prev ? { ...prev, [field]: value } : null);
    if (field === 'email') {
      if (!emailRegex.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSave = () => {
    if (emailError) {
        alert("Cannot save: Please fix the errors.");
        return;
    }
    onSave(editableLead);
  };
  
  const handleCancel = () => {
      onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 ${
          lead ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${
        lead ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{lead.name}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <p className="text-slate-600">{lead.company}</p>
            </div>

            {/* Panel Body */}
            <div className="p-6 space-y-4 flex-grow">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input 
                        type="email" 
                        value={editableLead.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            emailError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
                        }`}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select 
                        value={editableLead.status}
                        onChange={e => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        {leadStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                 <div className="border-t pt-4 mt-4 space-y-2 text-sm text-slate-600">
                     <p><strong>Source:</strong> {lead.source}</p>
                     <p><strong>Score:</strong> {lead.score}</p>
                 </div>
            </div>

            {/* Panel Footer */}
            <div className="p-6 bg-slate-50 border-t flex justify-between items-center">
                 <button 
                    onClick={() => onConvert(lead)}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Convert to Opportunity
                </button>
                <div className="flex gap-2">
                    <button onClick={handleCancel} className="px-4 py-2 bg-white border border-slate-300 font-semibold rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" disabled={!!emailError}>
                        Save
                    </button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}