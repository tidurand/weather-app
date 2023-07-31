import SearchBar from './components/SearchBar/SearchBar'
import WeatherDisplayer from './components/WeatherDisplayer/WeatherDisplayer'
import './App.scss'
import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')

  return (
    <div className='App'>
      <SearchBar setCity={setCity} />
      <WeatherDisplayer city={city} />
    </div>
  )
}

export default App
