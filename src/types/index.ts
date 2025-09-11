export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'New' | 'Contacted' | 'Qualified' | 'Disqualified';
};

export interface Opportunity {
  id: number;
  name: string;
  stage: 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  amount?: number;
  accountName: string;
};

export interface LeadDetailPanelProps {
  lead: Lead | null;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
};