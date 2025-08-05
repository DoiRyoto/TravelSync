import { treaty } from '@elysiajs/eden'
import type { App } from '@/app/api/[...elysia]/route'

// Create Eden treaty client
const baseUrl = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_VERCEL_URL || 'https://travel-sync-kappa.vercel.app/'
  : 'http://localhost:3000'

export const api = treaty<App>(baseUrl)

export type ApiClient = typeof api