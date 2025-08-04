// Elysia Backend Server for CultureSync
import { Elysia } from "elysia"
import { allCountries } from "./lib/countries"

const app = new Elysia()
  .get("/", () => "CultureSync API Server")
  
  // Health check endpoint
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  
  // Get all countries
  .get("/api/countries", () => ({
    countries: allCountries,
    total: allCountries.length
  }))
  
  
  // Search countries by name
  .get("/api/countries/search", ({ query }) => {
    const { q } = query as { q?: string }
    
    if (!q) {
      return { countries: [], total: 0 }
    }
    
    const lowerCaseQuery = q.toLowerCase()
    const filteredCountries = allCountries.filter(country => 
      country.name.toLowerCase().includes(lowerCaseQuery)
    )
    
    return {
      countries: filteredCountries,
      total: filteredCountries.length,
      query: q
    }
  })
  
  
  // CORS headers for development
  .onBeforeHandle(({ set }) => {
    set.headers["Access-Control-Allow-Origin"] = "*"
    set.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    set.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
  })
  
  // Handle preflight requests
  .options("*", ({ set }) => {
    set.headers["Access-Control-Allow-Origin"] = "*"
    set.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    set.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return ""
  })

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`🦊 CultureSync API Server is running at http://localhost:${port}`)
  console.log(`📍 Available endpoints:`)
  console.log(`   GET  /health - Health check`)
  console.log(`   GET  /api/countries - Get all countries`)
  console.log(`   GET  /api/countries/search?q=japan - Search countries`)

})

export default app