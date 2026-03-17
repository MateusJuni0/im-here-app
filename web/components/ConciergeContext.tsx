"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// Tipos base para o nosso sistema de orquestração soberana
type TransportProvider = 'UBER' | 'BOLT' | 'FREE_NOW';

interface ConciergeRequest {
  id: string;
  destination: string;
  preferredProvider: TransportProvider;
  status: 'PENDING' | 'RETRYING' | 'SWITCHED' | 'SUCCESS' | 'FAILED';
}

interface ConciergeContextType {
  requestTransport: (destination: string, provider: TransportProvider) => Promise<void>;
  currentStatus: ConciergeRequest | null;
}

const ConciergeContext = createContext<ConciergeContextType | undefined>(undefined);

export const ConciergeProvider = ({ children }: { children: ReactNode }) => {
  const [currentStatus, setCurrentStatus] = useState<ConciergeRequest | null>(null);

  const requestTransport = async (destination: string, preferredProvider: TransportProvider) => {
    const requestId = crypto.randomUUID();
    
    // Pilar 6: Concierge Buffer (Lógica de Resiliência)
    const attemptRequest = async (provider: TransportProvider): Promise<boolean> => {
      console.log(`[Concierge] Tentando ${provider} para ${destination}...`);
      
      // Simulação de chamada de API resiliente
      try {
        // Implementar fetch para API de transporte aqui
        const success = Math.random() > 0.3; // Simulação de falha
        if (!success) throw new Error('API Timeout');
        return true;
      } catch (err) {
        return false;
      }
    };

    setCurrentStatus({ id: requestId, destination, preferredProvider, status: 'PENDING' });

    // Tentar o preferencial
    let success = await attemptRequest(preferredProvider);

    if (!success) {
      setCurrentStatus(prev => prev ? {...prev, status: 'RETRYING'} : null);
      
      // Pilar 6: Fallback automático (ex: se Uber falhar, ir de Bolt)
      const fallbackProvider = preferredProvider === 'UBER' ? 'BOLT' : 'UBER';
      console.log(`[Concierge] Falha no ${preferredProvider}. Alternando para ${fallbackProvider}...`);
      
      success = await attemptRequest(fallbackProvider);
      
      if (success) {
        setCurrentStatus(prev => prev ? {...prev, status: 'SWITCHED'} : null);
      } else {
        setCurrentStatus(prev => prev ? {...prev, status: 'FAILED'} : null);
      }
    } else {
      setCurrentStatus(prev => prev ? {...prev, status: 'SUCCESS'} : null);
    }
  };

  return (
    <ConciergeContext.Provider value={{ requestTransport, currentStatus }}>
      {children}
    </ConciergeContext.Provider>
  );
};

export const useConcierge = () => {
  const context = useContext(ConciergeContext);
  if (!context) throw new Error('useConcierge must be used within a ConciergeProvider');
  return context;
};
