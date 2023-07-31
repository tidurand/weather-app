import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  debounce,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import parse from 'autosuggest-highlight/parse'
import './SearchBar.scss'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const loadScript = (src: string, position: HTMLElement | null, id: string) => {
  if (!position) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

interface SearchBarProps {
  setCity: React.Dispatch<React.SetStateAction<string>>
}

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}
interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
}

interface AutocompleteService {
  getPlacePredictions(
    request: google.maps.places.AutocompletionRequest,
    callback: (
      results?: google.maps.places.AutocompletePrediction[] | null,
      status?: google.maps.places.PlacesServiceStatus
    ) => void
  ): void
}

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY

const SearchBar: React.FC<SearchBarProps> = ({ setCity }) => {
  const [value, setValue] = useState<PlaceType | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<readonly PlaceType[]>([])
  const loaded = useRef(false)
  const autocompleteService = useRef<AutocompleteService | null>(null)

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places&callback=Function.prototype`,
        document.querySelector('head'),
        'google-maps'
      )
    }
    loaded.current = true
  }

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string; types: string[] },
          callback: (results?: readonly PlaceType[] | null) => void
        ) => {
          autocompleteService.current?.getPlacePredictions(request, callback)
        },
        400
      ),
    []
  )

  const handleClick = useCallback(() => {
    setCity(inputValue)
  }, [inputValue, setCity])

  useEffect(() => {
    let active = true

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) return undefined

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue, types: ['(cities)'] }, (results?: readonly PlaceType[] | null) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []
        if (value) newOptions = [value]
        if (results) newOptions = [...newOptions, ...results]
        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  return (
    <Autocomplete
      id='searchBar'
      sx={{ width: '60%' }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText='No locations'
      onChange={(_event, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
      }}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Add a location'
          fullWidth
          margin='normal'
          sx={{ backgroundColor: 'white', borderRadius: '5px' }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position='end'>
                <Button variant='outlined' onClick={handleClick}>
                  Enter
                </Button>
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        )

        return (
          <li {...props}>
            <Grid container alignItems='center'>
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component='span'
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant='body2' color='text.secondary'>
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}

export default SearchBar
