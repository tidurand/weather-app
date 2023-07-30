import SearchBar from './components/SearchBar/SearchBar'
import WeatherDisplayer from './components/WeatherDisplayer/WeatherDisplayer'
import './App.scss'
import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')

  return (
    <div className='App'>
      <header className='App-header'>
        <SearchBar setCity={setCity} />
      </header>
      <main>
        <WeatherDisplayer city={city} />
      </main>
      <footer></footer>
    </div>
  )
}

export default App
