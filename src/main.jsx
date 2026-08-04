import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { initializeAnalytics } from './utils/analytics.js'
import { redirectLegacyLanguageUrl } from './i18n/localeRoutes.js'

if (!redirectLegacyLanguageUrl()) {
  initializeAnalytics()

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
