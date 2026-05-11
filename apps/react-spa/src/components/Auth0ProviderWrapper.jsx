import { Auth0Provider } from "@auth0/auth0-react";

function ConfigErrorScreen() {
  return (
    <div className="auth-error-screen">
      <div className="auth-error-card">
        <div className="auth-error-icon">!</div>
        <h1 className="auth-error-title">Auth0 Not Configured</h1>
        <p className="auth-error-message">
          The application cannot start because Auth0 credentials are missing.
          Please set up your Auth0 tenant and add the required environment variables.
        </p>
        <div className="auth-error-steps">
          <p className="auth-error-steps-title">Required <code>.env</code> variables:</p>
          <code className="auth-error-code">VITE_AUTH0_DOMAIN=your-tenant.auth0.com</code>
          <code className="auth-error-code">VITE_AUTH0_CLIENT_ID=your-client-id</code>
        </div>
        <a
          href="https://auth0.com/docs/get-started"
          target="_blank"
          rel="noopener noreferrer"
          className="auth-error-link"
        >
          Auth0 Setup Guide &rarr;
        </a>
      </div>
    </div>
  );
}

export default function Auth0ProviderWrapper({ children }) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  if (!domain || !clientId) {
    return <ConfigErrorScreen />;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
}
