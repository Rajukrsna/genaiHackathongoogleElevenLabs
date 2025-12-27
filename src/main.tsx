import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { ClerkProvider } from '@clerk/clerk-react';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { queryClient } from './lib/queryClient';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker for PWA auto-update and offline support
if (import.meta.env.PROD) {
  registerSW({
    onNeedRefresh() {
      console.log('Service worker update available.');
    },
    onOfflineReady() {
      console.log('Service worker installed: app ready for offline use.');
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
