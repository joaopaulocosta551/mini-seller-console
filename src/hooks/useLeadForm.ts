import { useState, useEffect } from 'react';
import type { Lead } from '../types';
import { emailRegex } from '../constants';

export const useLeadForm = (lead: Lead | null) => {
  const [editableLead, setEditableLead] = useState<Lead | null>(null);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (lead) {
      setEditableLead({ ...lead });
      setEmailError('');
    }
  }, [lead]);

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

  const validateForm = () => {
    return !emailError;
  };

  return {
    editableLead,
    emailError,
    handleInputChange,
    validateForm
  };
};