/**
 * Theme provider for styling configuration.
 * @module theme-provider
 * @internal
 */

'use client';;
import { applyStyleOverrides } from '@auth0/universal-components-core';
import * as React from 'react';

import { PortalContext } from '@/providers/portal-context';

/** Default empty style overrides. */
const defaultStyleOverrides = { common: {}, light: {}, dark: {} };

/**
 * Theme context for accessing theme settings.
 * @internal
 * @returns The context provider component
 */
export const ThemeContext = React.createContext({
  isDarkMode: false,
  variables: defaultStyleOverrides,
  loader: null,
});

/**
 * Provides theme configuration to the component tree.
 * @param props - Component props.
 * @param props.themeSettings - Theme settings with mode, variables, and loader.
 * @param props.children - Child components.
 * @returns Theme provider.
 * @internal
 */
export const ThemeProvider = ({ themeSettings, children }) => {
  const { variables, loader, mode, theme } = React.useMemo(() => ({
    variables: themeSettings?.variables ?? defaultStyleOverrides,
    loader: themeSettings?.loader ?? null,
    mode: themeSettings?.mode,
    theme: themeSettings?.theme ?? 'default',
  }), [themeSettings]);

  const [portalContainer, setPortalContainer] = React.useState(null);

  React.useEffect(() => {
    applyStyleOverrides(variables, mode, theme);
  }, [variables, mode, theme]);

  return (
    <ThemeContext.Provider value={{ isDarkMode: mode === 'dark', theme, variables, loader }}>
      <PortalContext.Provider value={portalContainer}>
        {children}
        <div className="auth0-universal" data-theme={theme} ref={setPortalContainer} />
      </PortalContext.Provider>
    </ThemeContext.Provider>
  );
};
