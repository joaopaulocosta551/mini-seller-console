import React from 'react';

interface SlideOverPanelProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const SlideOverPanel: React.FC<SlideOverPanelProps> = ({ 
  isOpen, 
  children 
}) => {
  return (
    <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {children}
      </div>
    </div>
  );
};