import { useState, useEffect } from 'react'

// Define types for travel options based on existing structure
export interface TravelerType {
  value: string
  label: string
  icon: string
  description: string
}

export interface AgeGroup {
  value: string
  label: string
  icon: string
}

export interface ExperienceLevel {
  value: string
  label: string
  icon: string
  description: string
}

export interface TravelPurpose {
  value: string
  label: string
  icon: string
  description: string
}

export interface Interest {
  value: string
  label: string
  icon: string
}

export interface BudgetLevel {
  value: string
  label: string
  icon: string
  description: string
  range: string
}

export interface CulturalLevel {
  value: string
  label: string
  icon: string
  description: string
}

export interface DurationOption {
  value: number
  label: string
}

export interface Season {
  value: string
  label: string
  icon: string
  description: string
}

export interface TravelOptions {
  travelerTypes: TravelerType[]
  ageGroups: AgeGroup[]
  experienceLevels: ExperienceLevel[]
  purposes: TravelPurpose[]
  interests: Interest[]
  budgetLevels: BudgetLevel[]
  culturalLevels: CulturalLevel[]
  durations: DurationOption[]
  seasons: Season[]
}

// Main hook for fetching all travel options
export function useTravelOptions() {
  const [options, setOptions] = useState<TravelOptions | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTravelOptions() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setOptions(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch travel options'))
        setOptions(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTravelOptions()
  }, [])

  return { options, loading, error }
}

// Specific hooks for individual option types
export function useTravelerTypes() {
  const [travelerTypes, setTravelerTypes] = useState<TravelerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTravelerTypes() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options/traveler-types')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setTravelerTypes(data.travelerTypes || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch traveler types'))
        setTravelerTypes([])
      } finally {
        setLoading(false)
      }
    }

    fetchTravelerTypes()
  }, [])

  return { travelerTypes, loading, error }
}

export function useAgeGroups() {
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchAgeGroups() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options/age-groups')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setAgeGroups(data.ageGroups || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch age groups'))
        setAgeGroups([])
      } finally {
        setLoading(false)
      }
    }

    fetchAgeGroups()
  }, [])

  return { ageGroups, loading, error }
}

export function useExperienceLevels() {
  const [experienceLevels, setExperienceLevels] = useState<ExperienceLevel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchExperienceLevels() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options/experience-levels')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setExperienceLevels(data.experienceLevels || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch experience levels'))
        setExperienceLevels([])
      } finally {
        setLoading(false)
      }
    }

    fetchExperienceLevels()
  }, [])

  return { experienceLevels, loading, error }
}

export function useSeasons() {
  const [seasons, setSeasons] = useState<Season[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSeasons() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options/seasons')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setSeasons(data.seasons || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch seasons'))
        setSeasons([])
      } finally {
        setLoading(false)
      }
    }

    fetchSeasons()
  }, [])

  return { seasons, loading, error }
}

export function useDurationOptions() {
  const [durations, setDurations] = useState<DurationOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchDurations() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options/durations')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setDurations(data.durations || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch durations'))
        setDurations([])
      } finally {
        setLoading(false)
      }
    }

    fetchDurations()
  }, [])

  return { durations, loading, error }
}

export function useTravelPurposes() {
  const [purposes, setPurposes] = useState<TravelPurpose[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPurposes() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options/purposes')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setPurposes(data.purposes || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch purposes'))
        setPurposes([])
      } finally {
        setLoading(false)
      }
    }

    fetchPurposes()
  }, [])

  return { purposes, loading, error }
}

export function useInterests() {
  const [interests, setInterests] = useState<Interest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchInterests() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options/interests')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setInterests(data.interests || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch interests'))
        setInterests([])
      } finally {
        setLoading(false)
      }
    }

    fetchInterests()
  }, [])

  return { interests, loading, error }
}

export function useBudgetLevels() {
  const [budgetLevels, setBudgetLevels] = useState<BudgetLevel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchBudgetLevels() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options/budget-levels')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setBudgetLevels(data.budgetLevels || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch budget levels'))
        setBudgetLevels([])
      } finally {
        setLoading(false)
      }
    }

    fetchBudgetLevels()
  }, [])

  return { budgetLevels, loading, error }
}

export function useCulturalLevels() {
  const [culturalLevels, setCulturalLevels] = useState<CulturalLevel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCulturalLevels() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/travel-options/cultural-levels')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setCulturalLevels(data.culturalLevels || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch cultural levels'))
        setCulturalLevels([])
      } finally {
        setLoading(false)
      }
    }

    fetchCulturalLevels()
  }, [])

  return { culturalLevels, loading, error }
}