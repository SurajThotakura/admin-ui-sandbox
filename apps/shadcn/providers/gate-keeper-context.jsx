'use client';;
import { createContext, useContext } from 'react';

export const GateKeeperContext = createContext(null);

/**
 * @internal
 * @returns Current GateKeeper context value
 * @throws Error if used outside of the GateKeeperProvider
 */
export function useGateKeeperContext() {
  const context = useContext(GateKeeperContext);

  if (!context) {
    throw new Error('useGateKeeperContext must be used within a GateKeeperProvider');
  }

  return context;
}
