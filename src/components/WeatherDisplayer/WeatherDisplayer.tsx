/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from 'react'
import './WeatherDisplayer.scss'
import axios from 'axios'

interface WeatherDisplayerProps {
  city: string
}

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const WeatherDisplayer: React.FC<WeatherDisplayerProps> = ({ city }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
          params: {
            key: WEATHER_API_KEY,
            q: city,
            lang: 'fr',
          },
        })
        if (response.status === 200) {
          console.log(response.data)
        } else console.log('error', response.status)
      } catch (error) {
        console.log(error)
      }
    }
    if (city) void fetchData()
  }, [city])

  return <div className='weatherDisplayer'></div>
}

export default WeatherDisplayer
