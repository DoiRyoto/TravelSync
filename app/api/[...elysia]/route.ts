import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { allCountries } from '@/lib/countries'
import {
  TRAVELER_TYPES,
  AGE_GROUPS,
  EXPERIENCE_LEVELS,
  TRAVEL_PURPOSES,
  INTERESTS,
  BUDGET_LEVELS,
  CULTURAL_LEVELS,
  DURATION_OPTIONS,
  SEASONS
} from '@/lib/travel-options'

const app = new Elysia({ prefix: '/api' })
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: 'TravelSync API',
        version: '1.0.0',
        description: 'API for TravelSync travel planning application'
      },
      tags: [
        { name: 'Countries', description: 'Country data endpoints' },
        { name: 'Travel Options', description: 'Travel planning options endpoints' },
        { name: 'Health', description: 'System health endpoints' }
      ]
    }
  }))
  
  // Health check endpoint
  .get('/health', () => ({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'TravelSync API'
  }), {
    detail: {
      tags: ['Health']
    }
  })
  
  // Countries endpoints
  .get('/countries', () => ({ 
    countries: allCountries,
    total: allCountries.length
  }), {
    detail: {
      tags: ['Countries'],
      summary: 'Get all countries',
      description: 'Retrieve a list of all available countries with their continent information'
    }
  })
  
  .get('/countries/:id', ({ params: { id } }) => {
    const country = allCountries.find(c => c.id === id)
    if (!country) {
      throw new Error('Country not found')
    }
    return { country }
  }, {
    detail: {
      tags: ['Countries'],
      summary: 'Get country by ID',
      description: 'Retrieve detailed information about a specific country'
    }
  })
  
  .get('/countries/continent/:continent', ({ params: { continent } }) => {
    const countries = allCountries.filter(c => 
      c.continent.toLowerCase() === continent.toLowerCase()
    )
    return { 
      countries,
      continent,
      total: countries.length
    }
  }, {
    detail: {
      tags: ['Countries'],
      summary: 'Get countries by continent',
      description: 'Retrieve all countries from a specific continent'
    }
  })
  
  // Travel options endpoints
  .get('/travel-options/traveler-types', () => ({ 
    travelerTypes: TRAVELER_TYPES 
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get traveler types',
      description: 'Retrieve all available traveler type options'
    }
  })
  
  .get('/travel-options/age-groups', () => ({ 
    ageGroups: AGE_GROUPS 
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get age groups',
      description: 'Retrieve all available age group options'
    }
  })
  
  .get('/travel-options/experience-levels', () => ({ 
    experienceLevels: EXPERIENCE_LEVELS 
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get experience levels',
      description: 'Retrieve all available travel experience level options'
    }
  })
  
  .get('/travel-options/purposes', () => ({ 
    purposes: TRAVEL_PURPOSES 
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get travel purposes',
      description: 'Retrieve all available travel purpose options'
    }
  })
  
  .get('/travel-options/interests', () => ({ 
    interests: INTERESTS 
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get interests',
      description: 'Retrieve all available interest options'
    }
  })
  
  .get('/travel-options/budget-levels', () => ({ 
    budgetLevels: BUDGET_LEVELS 
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get budget levels',
      description: 'Retrieve all available budget level options'
    }
  })
  
  .get('/travel-options/cultural-levels', () => ({ 
    culturalLevels: CULTURAL_LEVELS 
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get cultural levels',
      description: 'Retrieve all available cultural level options'
    }
  })
  
  .get('/travel-options/durations', () => ({ 
    durations: DURATION_OPTIONS 
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get duration options',
      description: 'Retrieve all available trip duration options'
    }
  })
  
  .get('/travel-options/seasons', () => ({ 
    seasons: SEASONS 
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get seasons',
      description: 'Retrieve all available season options'
    }
  })
  
  // Combined travel options endpoint
  .get('/travel-options', () => ({
    travelerTypes: TRAVELER_TYPES,
    ageGroups: AGE_GROUPS,
    experienceLevels: EXPERIENCE_LEVELS,
    purposes: TRAVEL_PURPOSES,
    interests: INTERESTS,
    budgetLevels: BUDGET_LEVELS,
    culturalLevels: CULTURAL_LEVELS,
    durations: DURATION_OPTIONS,
    seasons: SEASONS
  }), {
    detail: {
      tags: ['Travel Options'],
      summary: 'Get all travel options',
      description: 'Retrieve all available travel planning options in a single request'
    }
  })

export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
export const PATCH = app.handle

// Export the app type for Eden treaty
export type App = typeof app