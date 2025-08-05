import { useState, useEffect } from 'react'

// Define the country type based on our existing data structure
export interface Country {
  id: string
  name: string
  continent: string
}

// Custom hook for fetching countries data
export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/countries')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setCountries(data.countries || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch countries'))
        // Fallback to empty array on error to maintain component functionality
        setCountries([])
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return { countries, loading, error }
}

// Hook for fetching a specific country by ID
export function useCountry(countryId: string | null) {
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!countryId) {
      setCountry(null)
      setLoading(false)
      return
    }

    async function fetchCountry() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/countries/${countryId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setCountry(data.country || null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch country'))
        setCountry(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()
  }, [countryId])

  return { country, loading, error }
}