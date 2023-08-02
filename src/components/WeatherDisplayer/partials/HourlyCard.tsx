import { Informations } from '../../../interfaces'
import './HourlyCard.scss'

interface HourlyCardProps {
  data: Informations
  index: number
}

const HourlyCard: React.FC<HourlyCardProps> = ({ data, index }) => {
  return (
    <div className='hourlyCard'>
      <p className='hour'>{index}h</p>
      <img
        className='weatherIcon'
        src='https://cdn.weatherapi.com/weather/128x128/day/116.png'
        width='64px'
      />
      <p className='temp'>{data.temp}°</p>
    </div>
  )
}

export default HourlyCard
