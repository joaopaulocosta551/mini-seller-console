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