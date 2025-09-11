import type { Lead } from "../types";

export  const initialLeads: Lead[] = [
    { id: 1, name: 'John Doe', company: 'Innovate Inc.', email: 'john.doe@innovate.com', source: 'Web', score: 95, status: 'Qualified' },
    { id: 2, name: 'Jane Smith', company: 'Solutions LLC', email: 'jane.smith@solutions.com', source: 'Referral', score: 80, status: 'Contacted' },
    { id: 3, name: 'Peter Jones', company: 'Data Systems', email: 'peter.jones@datasys.com', source: 'Cold Call', score: 40, status: 'New' },
    { id: 4, name: 'Mary Johnson', company: 'Creative Co.', email: 'mary.j@creative.co', source: 'Web', score: 92, status: 'Qualified' },
    { id: 5, name: 'David Brown', company: 'Tech Forward', email: 'david.b@techforward.com', source: 'Partner', score: 75, status: 'Contacted' },
    { id: 6, name: 'Linda Wilson', company: 'Global Net', email: 'linda.w@globalnet.com', source: 'Web', score: 60, status: 'New' },
    { id: 7, name: 'Robert Miller', company: 'Innovate Inc.', email: 'robert.m@innovate.com', source: 'Referral', score: 88, status: 'Qualified' },
    { id: 8, name: 'Patricia Garcia', company: 'Solutions LLC', email: 'patricia.g@solutions.com', source: 'Web', score: 70, status: 'Contacted' },
    { id: 9, name: 'Michael Rodriguez', company: 'Data Systems', email: 'michael.r@datasys.com', source: 'Cold Call', score: 30, status: 'Disqualified' },
    { id: 10, name: 'Jennifer Martinez', company: 'Creative Co.', email: 'jennifer.m@creative.co', source: 'Partner', score: 98, status: 'Qualified' },
];