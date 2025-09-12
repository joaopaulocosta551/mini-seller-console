
import { useState, useEffect, useMemo } from 'react';
import type { Lead, Opportunity } from './types';
import { initialLeads } from './data/mockLeads';
import { LeadDetailPanel } from './components/ui/LeadDetailPanel';
import { leadStatuses } from './constants';


// const leadStatuses: Lead['status'][] = ['New', 'Contacted', 'Qualified', 'Disqualified'];

// --- HELPER FUNCTIONS ---
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- MAIN APP COMPONENT ---
export default function App() {
  // --- STATE MANAGEMENT ---
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filtering and searching, with initial values from localStorage
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Lead['status'] | 'All'>(
    () => (localStorage.getItem('miniSellerConsoleStatusFilter') as Lead['status'] | 'All') || 'All'
  );

  // --- DATA FETCHING SIMULATION ---
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
    }, 1000); // Simulate 1-second network latency

    return () => clearTimeout(timer);
  }, []);
  
  // --- LOCALSTORAGE PERSISTENCE FOR FILTER ---
  useEffect(() => {
    localStorage.setItem('miniSellerConsoleStatusFilter', statusFilter);
  }, [statusFilter]);

  // --- COMPUTED/MEMOIZED VALUES ---
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
      .sort((a, b) => b.score - a.score); // Sort by score descending
  }, [leads, searchTerm, statusFilter]);

  // --- EVENT HANDLERS ---
  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prevLeads =>
      prevLeads.map(lead => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    setSelectedLead(null);
  };

  const handleConvertToOpportunity = (leadToConvert: Lead) => {
    const newOpportunity: Opportunity = {
      id: Date.now(), // Simple unique ID
      name: `${leadToConvert.name}'s Opportunity`,
      stage: 'Discovery',
      accountName: leadToConvert.company,
      amount: 50000, // Example amount
    };

    setOpportunities(prev => [...prev, newOpportunity]);
    setLeads(prev => prev.filter(lead => lead.id !== leadToConvert.id));
    setSelectedLead(null);
  };

  // --- RENDER ---
  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mini Seller Console</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Leads Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Leads</h2>
            
            {/* Filter and Search Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search by name or company..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full sm:w-1/2 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as Lead['status'] | 'All')}
                className="w-full sm:w-auto px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="All">All Statuses</option>
                {leadStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            {/* Leads Table */}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-10">Loading leads...</div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
              ) : filteredAndSortedLeads.length === 0 ? (
                 <div className="text-center py-10 text-slate-500">No leads found.</div>
              ) : (
                <table className="w-full text-left">
                  <thead className="border-b border-slate-200 text-sm text-slate-600">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3 hidden sm:table-cell">Company</th>
                      <th className="p-3 hidden md:table-cell">Status</th>
                      <th className="p-3 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedLeads.map(lead => (
                      <tr 
                        key={lead.id} 
                        onClick={() => setSelectedLead(lead)}
                        className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <td className="p-3 font-medium">{lead.name}</td>
                        <td className="p-3 hidden sm:table-cell text-slate-600">{lead.company}</td>
                        <td className="p-3 hidden md:table-cell">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                            lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                            lead.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-slate-200 text-slate-700'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-3 text-right font-semibold text-blue-600">{lead.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          
          {/* Opportunities Section */}
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
        </div>
      </main>

      {/* Lead Detail Slide-over Panel */}
      <LeadDetailPanel 
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSave={handleUpdateLead}
        onConvert={handleConvertToOpportunity}
      />
    </div>
  );
}

// --- SUB-COMPONENTS ---

// function LeadDetailPanel({ lead, onClose, onSave, onConvert }: LeadDetailPanelProps) {
//   const [editableLead, setEditableLead] = useState<Lead | null>(null);
//   const [emailError, setEmailError] = useState('');

//   useEffect(() => {
//     if (lead) {
//       setEditableLead({ ...lead });
//       setEmailError('');
//     }
//   }, [lead]);

//   if (!lead || !editableLead) return null;

//   const handleInputChange = (field: keyof Lead, value: string) => {
//     setEditableLead(prev => prev ? { ...prev, [field]: value } : null);
//     if (field === 'email') {
//       if (!emailRegex.test(value)) {
//         setEmailError('Please enter a valid email address.');
//       } else {
//         setEmailError('');
//       }
//     }
//   };

//   const handleSave = () => {
//     if (emailError) {
//         alert("Cannot save: Please fix the errors.");
//         return;
//     }
//     onSave(editableLead);
//   };
  
//   const handleCancel = () => {
//       onClose();
//   }

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         onClick={onClose}
//         className={`fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 ${
//           lead ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//       />
      
//       {/* Panel */}
//       <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${
//         lead ? 'translate-x-0' : 'translate-x-full'
//       }`}>
//         <div className="flex flex-col h-full">
//             {/* Panel Header */}
//             <div className="p-6 border-b">
//                 <div className="flex justify-between items-center">
//                     <h3 className="text-xl font-semibold">{lead.name}</h3>
//                     <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//                     </button>
//                 </div>
//                 <p className="text-slate-600">{lead.company}</p>
//             </div>

//             {/* Panel Body */}
//             <div className="p-6 space-y-4 flex-grow">
//                 <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
//                     <input 
//                         type="email" 
//                         value={editableLead.email}
//                         onChange={e => handleInputChange('email', e.target.value)}
//                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                             emailError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
//                         }`}
//                     />
//                     {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
//                 </div>
//                  <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
//                     <select 
//                         value={editableLead.status}
//                         onChange={e => handleInputChange('status', e.target.value)}
//                         className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                     >
//                         {leadStatuses.map(status => (
//                             <option key={status} value={status}>{status}</option>
//                         ))}
//                     </select>
//                 </div>
//                  <div className="border-t pt-4 mt-4 space-y-2 text-sm text-slate-600">
//                      <p><strong>Source:</strong> {lead.source}</p>
//                      <p><strong>Score:</strong> {lead.score}</p>
//                  </div>
//             </div>

//             {/* Panel Footer */}
//             <div className="p-6 bg-slate-50 border-t flex justify-between items-center">
//                  <button 
//                     onClick={() => onConvert(lead)}
//                     className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                 >
//                     Convert to Opportunity
//                 </button>
//                 <div className="flex gap-2">
//                     <button onClick={handleCancel} className="px-4 py-2 bg-white border border-slate-300 font-semibold rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                         Cancel
//                     </button>
//                     <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" disabled={!!emailError}>
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </>
//   );
// }
