import { AsyncLocalStorage } from 'node:async_hooks'

// Request-scoped injection keeps the existing Netlify deployment unchanged.
export const storeContext = new AsyncLocalStorage()
