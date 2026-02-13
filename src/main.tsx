import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// We removed StrictMode to prevent double-rendering bugs on mobile
createRoot(document.getElementById('root')!).render(
  <App />
)