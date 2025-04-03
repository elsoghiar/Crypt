import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { securityConfig } from '../lib/config';

// Context type definition
interface AppContextType {
  clipboardAutoClear: boolean;
  setClipboardAutoClear: (value: boolean) => void;
  clipboardClearDelay: number;
  setClipboardClearDelay: (value: number) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  clipboardAutoClear: true,
  setClipboardAutoClear: () => {},
  clipboardClearDelay: 60000,
  setClipboardClearDelay: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Initialize settings from localStorage or defaults
  const [clipboardAutoClear, setClipboardAutoClear] = useState<boolean>(() => {
    const savedValue = localStorage.getItem(securityConfig.storageKeys.clipboardAutoClearEnabled);
    return savedValue !== null 
      ? savedValue === 'true' 
      : securityConfig.clipboardAutoClearEnabled;
  });

  const [clipboardClearDelay, setClipboardClearDelay] = useState<number>(() => {
    const savedValue = localStorage.getItem(securityConfig.storageKeys.clipboardClearDelay);
    return savedValue !== null 
      ? parseInt(savedValue, 10) 
      : securityConfig.clipboardClearDelay;
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem(
      securityConfig.storageKeys.clipboardAutoClearEnabled, 
      clipboardAutoClear.toString()
    );
  }, [clipboardAutoClear]);

  useEffect(() => {
    localStorage.setItem(
      securityConfig.storageKeys.clipboardClearDelay,
      clipboardClearDelay.toString()
    );
  }, [clipboardClearDelay]);

  return (
    <AppContext.Provider 
      value={{ 
        clipboardAutoClear, 
        setClipboardAutoClear,
        clipboardClearDelay,
        setClipboardClearDelay
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);