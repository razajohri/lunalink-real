import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { VapiService } from '@/services/VapiService';

interface VapiCredentials {
  apiKey: string;
  assistantId: string;
}

interface VapiContextType {
  credentials: VapiCredentials | null;
  service: VapiService | null;
  setCredentials: (credentials: VapiCredentials) => void;
  clearCredentials: () => void;
  isConfigured: boolean;
}

const VapiContext = createContext<VapiContextType | undefined>(undefined);

const STORAGE_KEY = 'vapi-credentials';

export const VapiProvider = ({ children }: { children: ReactNode }) => {
  const [credentials, setCredentialsState] = useState<VapiCredentials | null>(null);
  const [service, setService] = useState<VapiService | null>(null);

  // Load credentials from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const creds = JSON.parse(stored);
        setCredentialsState(creds);
        setService(new VapiService(creds.apiKey));
      } catch (error) {
        console.error('Error loading stored credentials:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const setCredentials = (newCredentials: VapiCredentials) => {
    setCredentialsState(newCredentials);
    setService(new VapiService(newCredentials.apiKey));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCredentials));
  };

  const clearCredentials = () => {
    setCredentialsState(null);
    setService(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isConfigured = Boolean(credentials?.apiKey && credentials?.assistantId);

  return (
    <VapiContext.Provider
      value={{
        credentials,
        service,
        setCredentials,
        clearCredentials,
        isConfigured,
      }}
    >
      {children}
    </VapiContext.Provider>
  );
};

export const useVapi = () => {
  const context = useContext(VapiContext);
  if (context === undefined) {
    throw new Error('useVapi must be used within a VapiProvider');
  }
  return context;
};