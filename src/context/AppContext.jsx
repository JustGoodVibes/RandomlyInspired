import React, { createContext, useContext } from 'react';
import { useSuggestionManager } from '../hooks/useSuggestionManager';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const suggestionManager = useSuggestionManager();

  const value = {
    ...suggestionManager
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
