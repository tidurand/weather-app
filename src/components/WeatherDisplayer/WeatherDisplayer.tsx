/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './WeatherDisplayer.scss'
import HourlyCard from './partials/HourlyCard'
import MainCard from './partials/MainCard'
import useCity from '../../hooks/useCity'
import { fakeData } from '../../utils/fakeData'

interface WeatherDisplayerProps {
  city: string
}

const WeatherDisplayer: React.FC<WeatherDisplayerProps> = ({ city }) => {
  const cityData = useCity(city)

  return (
    <div className='weatherDisplayer'>
      <p className='dayText'>Today</p>
      <MainCard data={cityData || fakeData} />
      <div className='hourlyContainer'>
        <HourlyCard />
        <HourlyCard />
        <HourlyCard />
        <HourlyCard />
        <HourlyCard />
        <HourlyCard />
      </div>
    </div>
  )
}

export default WeatherDisplayer
