
import type { Lead } from "./types";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const leadStatuses: Lead['status'][] = ['New', 'Contacted', 'Qualified', 'Disqualified'];

