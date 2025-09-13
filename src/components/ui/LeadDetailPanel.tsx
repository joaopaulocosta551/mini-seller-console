import type { LeadDetailPanelProps } from '../../types';
import { useLeadForm } from '../../hooks/useLeadForm';
import { SlideOverBackdrop } from './SlideOverBackdrop';
import { SlideOverPanel } from './SlideOverPanel';
import { LeadDetailHeader } from './LeadDetailHeader';
import { LeadFormFields } from './LeadFormFields';
import { LeadInfoSection } from './LeadInfoSection';
import { LeadDetailActions } from './LeadDetailActions';

export function LeadDetailPanel({ 
  lead, 
  onClose, 
  onSave, 
  onConvert 
}: LeadDetailPanelProps) {
  const {
    editableLead,
    emailError,
    handleInputChange,
    validateForm
  } = useLeadForm(lead);

  if (!lead || !editableLead) return null;

  const handleSave = () => {
    if (!validateForm()) {
      alert("Cannot save: Please fix the errors.");
      return;
    }
    onSave(editableLead);
  };

  const handleCancel = () => {
    onClose();
  };

  const isOpen = !!lead;

  return (
    <>
      <SlideOverBackdrop isOpen={isOpen} onClose={onClose} />
      
      <SlideOverPanel isOpen={isOpen}>
        <LeadDetailHeader lead={lead} onClose={onClose} />
        
        <div className="p-6 space-y-4 flex-grow">
          <LeadFormFields 
            editableLead={editableLead}
            emailError={emailError}
            onInputChange={handleInputChange}
          />
          
          <LeadInfoSection lead={lead} />
        </div>

        <LeadDetailActions
          lead={lead}
          onConvert={onConvert}
          onSave={handleSave}
          onCancel={handleCancel}
          isFormValid={validateForm()}
        />
      </SlideOverPanel>
    </>
  );
}