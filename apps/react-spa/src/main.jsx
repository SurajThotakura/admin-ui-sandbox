import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Auth0ProviderWrapper from './components/Auth0ProviderWrapper'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0ProviderWrapper>
      <App />
    </Auth0ProviderWrapper>
  </StrictMode>,
)
