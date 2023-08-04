import { CityData } from '../../../interfaces'
import './MainCard.scss'

interface MainCardProps {
  data: CityData
}

const MainCard: React.FC<MainCardProps> = ({ data }) => {
  return (
    <div className='mainCard'>
      <div className='mainInformations'>
        <p className='temperature'>{data.current.temp}°</p>
        <p>{data.current.description}</p>
        <p>
          Min: {data.current.min}° Max: {data.current.max}°
        </p>
      </div>
      <div className='additionnalInformations'>
        <div className='wind'>
          <img src='/src/assets/wind.png' title='wind icon' width='32px' />
          <p>{data.current.wind}km/h</p>
          <p>Vent</p>
        </div>
        <div className='humidity'>
          <img src='/src/assets/humidity.png' title='humidity icon' width='32px' />
          <p>{data.current.humidity}%</p>
          <p>Humidité</p>
        </div>
      </div>
      <img className='weatherIcon' src='https://cdn.weatherapi.com/weather/128x128/day/116.png' />
    </div>
  )
}

export default MainCard
