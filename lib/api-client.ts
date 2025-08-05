// Simple fetch-based API client for TravelSync
const baseUrl = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_VERCEL_URL || 'https://travel-sync-kappa.vercel.app/'
  : 'http://localhost:3000'

export const api = {
  baseUrl,
  
  async get(path: string) {
    const response = await fetch(`${baseUrl}${path}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },
  
  async post(path: string, data: any) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }
}

export type ApiClient = typeof api