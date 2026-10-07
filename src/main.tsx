import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Analytics + web-vitals load after first paint so they never compete
// with LCP on the critical path (was: static import in the main chunk).
const startAnalytics = () => {
  import('./analytics').then((m) => m.initAnalytics()).catch(() => {});
};
if ('requestIdleCallback' in window) {
  (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
    .requestIdleCallback(startAnalytics, { timeout: 4000 });
} else {
  setTimeout(startAnalytics, 2500);
}
