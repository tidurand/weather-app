// Maps API

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}
export interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
}

export interface AutocompleteService {
  getPlacePredictions(
    request: google.maps.places.AutocompletionRequest,
    callback: (
      results?: google.maps.places.AutocompletePrediction[] | null,
      status?: google.maps.places.PlacesServiceStatus
    ) => void
  ): void
}

// Weather API

export interface Informations {
  temp: number
  description: string
  wind?: number
  humidity?: number
  max: number
  min: number
}

interface DailyData {
  global: Informations
  hourly: Informations[]
}

export interface CityData {
  location: string
  current: Informations
  day: DailyData[]
}
