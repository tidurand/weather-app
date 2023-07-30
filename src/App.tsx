import SearchBar from './components/SearchBar/SearchBar'
import WeatherDisplayer from './components/WeatherDisplayer/WeatherDisplayer'
import './App.scss'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <SearchBar />
      </header>
      <main>
        <WeatherDisplayer />
      </main>
      <footer></footer>
    </div>
  )
}

export default App
