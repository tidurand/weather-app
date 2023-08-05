import SearchBar from './components/SearchBar/SearchBar'
import WeatherDisplayer from './components/WeatherDisplayer/WeatherDisplayer'
import './App.scss'
import { useState } from 'react'
import useCity from './hooks/useCity'
import { fakeData } from './utils/fakeData'

function App() {
  const [city, setCity] = useState('')
  const cityData = useCity(city)

  return (
    <div className='App'>
      <SearchBar setCity={setCity} />
      <WeatherDisplayer cityData={cityData || fakeData} />
    </div>
  )
}

export default App
