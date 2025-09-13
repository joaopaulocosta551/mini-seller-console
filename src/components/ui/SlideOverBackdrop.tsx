import React from 'react';

interface SlideOverBackdropProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SlideOverBackdrop: React.FC<SlideOverBackdropProps> = ({ 
  isOpen, 
  onClose 
}) => {
  return (
    <div 
      onClick={onClose}
      className={`fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    />
  );
};