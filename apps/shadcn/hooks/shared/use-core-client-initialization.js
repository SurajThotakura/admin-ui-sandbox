import { createCoreClient } from '@auth0/universal-components-core';
import * as React from 'react';

/**
 * @internal
 * @param props - Initialization props.
 * @returns The initialized CoreClient instance, or null while initializing.
 */
export const useCoreClientInitialization = (
  {
    authDetails,
    i18nOptions
  }
) => {
  const { authProxyUrl } = authDetails;
  const [coreClient, setCoreClient] = React.useState(null);

  React.useEffect(() => {
    const initializeCoreClient = async () => {
      try {
        const initializedCoreClient = await createCoreClient(authDetails, i18nOptions);
        setCoreClient(initializedCoreClient);
      } catch (error) {
        console.error(error);
      }
    };
    initializeCoreClient();
  }, [authProxyUrl, i18nOptions]);

  return coreClient;
};
