import * as React from 'react';

/** @internal */
const CoreClientContext = React.createContext({
  coreClient: null,
});

/**
 * Hook to access CoreClient from context.
 * @returns CoreClient instance or null.
 * @throws If used outside Auth0ComponentProvider.
 */
export const useCoreClient = () => {
  const context = React.useContext(CoreClientContext);
  if (!context) {
    throw new Error('useCoreClient must be used within Auth0ComponentProvider');
  }
  return context;
};

export { CoreClientContext };
