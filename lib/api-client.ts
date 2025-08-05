import { treaty } from '@elysiajs/eden'
import type { App } from '@/app/api/[...elysia]/route'

// Create Eden treaty client
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://travel-sync-kappa.vercel.app'
  : typeof window !== 'undefined' 
    ? window.location.origin  // Use same origin to avoid CORS in browser
    : 'http://localhost:3000'

export const api = treaty<App>(baseUrl)

export type ApiClient = typeof api