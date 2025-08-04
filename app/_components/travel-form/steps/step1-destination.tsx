import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"
import { allCountries } from "@/lib/countries"

interface Step1DestinationProps {
  destination: string
  destinationInput: string
  setDestinationInput: (value: string) => void
  onDestinationSelect: (countryId: string) => void
  onDestinationChange: (destination: string) => void
  error?: string
}

export function Step1Destination({
  destination,
  destinationInput,
  setDestinationInput,
  onDestinationSelect,
  onDestinationChange,
  error
}: Step1DestinationProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredCountries = useMemo(() => {
    if (!destinationInput.trim()) return allCountries
    const searchTerm = destinationInput.toLowerCase()
    return allCountries.filter(country =>
      country.name.toLowerCase().includes(searchTerm)
    )
  }, [destinationInput])

  const handleInputChange = (value: string) => {
    setDestinationInput(value)
    setShowSuggestions(true)
  }

  const handleCountrySelect = (country: typeof allCountries[0]) => {
    onDestinationSelect(country.id)
    setDestinationInput(country.name)
    setShowSuggestions(false)
  }

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <MapPin className="h-5 w-5 text-slate-600" />
          目的地を選択してください
        </CardTitle>
        <CardDescription className="text-slate-600">
          どちらの国・地域に旅行されますか？
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label htmlFor="destination" className="text-sm font-medium text-slate-700">目的地</Label>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="destination"
                type="text"
                placeholder="国名または地域名を入力してください"
                value={destinationInput}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="pl-10 border-slate-200 focus:border-slate-400"
              />
            </div>
            
            {showSuggestions && filteredCountries.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredCountries.map((country) => (
                  <Button
                    key={country.id}
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto text-left hover:bg-slate-50 text-slate-700"
                    onClick={() => handleCountrySelect(country)}
                  >
                    <div>
                      <div className="font-medium text-sm">{country.name}</div>
                      <div className="text-xs text-slate-500">{country.continent}</div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        {destination && (
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-600" />
              <span className="font-medium text-slate-700 text-sm">選択済み:</span>
              <span className="text-slate-800 text-sm">
                {allCountries.find(c => c.id === destination)?.name}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}