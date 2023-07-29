import { Autocomplete, TextField } from '@mui/material'
import './SearchBar.scss'

const SearchBar = () => {
  return <div className='searchBar'>
    <Autocomplete
      disablePortal
      freeSolo
      options={[]}
      renderInput={(params) => (
        <TextField {...params}
        sx={{ backgroundColor: 'white' }}
        label="Enter a city name"
        margin="normal"
      />)
    }
    />
  </div>
}

export default SearchBar
