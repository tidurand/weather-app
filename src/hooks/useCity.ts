/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CityData } from '../interfaces'

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const useCity = (city: string = 'Paris') => {
  const [data, setData] = useState<any>()
  const [cleanData, setCleanData] = useState<CityData>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
          params: {
            key: WEATHER_API_KEY,
            q: city,
            lang: 'fr',
            days: 3,
          },
        })
        if (response.status === 200) {
          console.log(response.data)
          setData(response.data)
        } else {
          console.log('error', response.status)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (city) void fetchData()
  }, [city])

  useEffect(() => {
    if (data) {
      const cityData: CityData = {
        location: data.location.name,
        current: {
          temp: data.current.temp_c,
          description: data.current.condition.text,
          codeIcon: data.current.condition.code,
          wind: data.current.wind_kph,
          humidity: data.current.humidity,
          max: data.forecast.forecastday[0].day.maxtemp_c,
          min: data.forecast.forecastday[0].day.mintemp_c,
        },
        day: data.forecast.forecastday.map((day: any) => ({
          global: {
            temp: day.day.avgtemp_c,
            description: day.day.condition.text,
            codeIcon: day.day.condition.code,
            max: day.day.maxtemp_c,
            min: day.day.mintemp_c,
          },
          hourly: day.hour.map((hour: any) => ({
            temp: hour.temp_c,
            description: hour.condition.text,
            codeIcon: hour.condition.code,
          })),
        })),
      }

      setCleanData(cityData)
    }
  }, [data])

  return cleanData
}

export default useCity
