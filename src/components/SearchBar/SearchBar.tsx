import { Autocomplete, Box, Grid, TextField, Typography, debounce } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import parse from 'autosuggest-highlight/parse'
import './SearchBar.scss'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AutocompleteService, PlaceType } from '../../interfaces'
import { loadScript } from '../../utils/loadScript'

interface SearchBarProps {
  setCity: React.Dispatch<React.SetStateAction<string>>
}

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY as string

const SearchBar: React.FC<SearchBarProps> = ({ setCity }) => {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<readonly PlaceType[]>([])
  const autocompleteService = useRef<AutocompleteService | null>(null)

  const handleChange = useCallback(
    (_event?: React.SyntheticEvent, newValue?: PlaceType | null) => {
      setCity(newValue?.structured_formatting.main_text || inputValue)
    },
    [inputValue, setCity]
  )

  const getCitiesSuggestions = useMemo(
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

  useEffect(() => {
    if (!window.google && !document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places&callback=Function.prototype`,
        'google-maps'
      )
    }
  }, [])

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      try {
        autocompleteService.current = new window.google.maps.places.AutocompleteService()
      } catch (error) {
        console.error('Failed to initialize AutocompleteService:', error)
      }
    }

    getCitiesSuggestions(
      { input: inputValue, types: ['(cities)'] },
      (results?: readonly PlaceType[] | null) => {
        setOptions(results || [])
      }
    )
  }, [inputValue, getCitiesSuggestions])

  return (
    <Autocomplete
      id='searchBar'
      sx={{ width: '60%', minWidth: '800px' }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      forcePopupIcon={false}
      value={null}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue)
        setOptions([])
      }}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Entrez une ville'
          fullWidth
          margin='normal'
          sx={{ backgroundColor: 'white', borderRadius: '5px', marginBottom: '10px' }}
        />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text || '',
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
