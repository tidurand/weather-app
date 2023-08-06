import SearchBar from './components/SearchBar/SearchBar'
import WeatherDisplayer from './components/WeatherDisplayer/WeatherDisplayer'
import './App.scss'
import './themes.scss'
import { useState } from 'react'
import useCity from './hooks/useCity'
import { fakeData } from './utils/fakeData'
import { setThemeByCode } from './utils/parsing'

function App() {
  const [city, setCity] = useState('Paris')
  const cityData = useCity(city)

  return (
    <div className={`App ${setThemeByCode(cityData?.current.codeIcon?.toString())}`}>
      <SearchBar setCity={setCity} />
      <WeatherDisplayer cityData={cityData || fakeData} />
    </div>
  )
}

export default App
