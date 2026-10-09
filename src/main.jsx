import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { initializeAnalytics } from './utils/analytics.js'
import { initializeClarity } from './utils/clarity.js'
import { redirectLegacyLanguageUrl } from './i18n/localeRoutes.js'
import { redirectLegacyAppUrl } from './seo/routes.js'

if (!redirectLegacyLanguageUrl() && !redirectLegacyAppUrl()) {
  initializeAnalytics()
  initializeClarity()

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
