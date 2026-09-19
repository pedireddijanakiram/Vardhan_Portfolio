'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GrainContextType {
  grainEnabled: boolean;
  toggleGrain: () => void;
  setGrainEnabled: (enabled: boolean) => void;
}

const GrainContext = createContext<GrainContextType | undefined>(undefined);

export const GrainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [grainEnabled, setGrainEnabled] = useState(true);

  const toggleGrain = () => {
    setGrainEnabled((prev) => !prev);
  };

  return (
    <GrainContext.Provider value={{ grainEnabled, toggleGrain, setGrainEnabled }}>
      {children}
      {/* Subtle cinematic grain texture overlay */}
      {grainEnabled && <div className="grain-overlay" aria-hidden="true" />}
    </GrainContext.Provider>
  );
};

export const useGrain = () => {
  const context = useContext(GrainContext);
  if (!context) {
    throw new Error('useGrain must be used within a GrainProvider');
  }
  return context;
};
