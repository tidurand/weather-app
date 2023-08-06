import { CityData } from '../../../interfaces'
import { findImageByCode } from '../../../utils/parsing'
import './MainCard.scss'

interface MainCardProps {
  data: CityData
}

const MainCard: React.FC<MainCardProps> = ({ data }) => {
  return (
    <div className='mainCard'>
      <div className='mainInformations'>
        <p className='temperature'>{data.current.temp}°</p>
        <p className='description'>{data.current.description}</p>
        <p>
          Min: {data.current.min}° Max: {data.current.max}°
        </p>
      </div>
      <div className='additionnalInformations'>
        <div className='wind'>
          <img src='/assets/wind.png' title='wind icon' width='32px' />
          <p>{data.current.wind}km/h</p>
          <p>Vent</p>
        </div>
        <div className='humidity'>
          <img src='/assets/humidity.png' title='humidity icon' width='32px' />
          <p>{data.current.humidity}%</p>
          <p>Humidité</p>
        </div>
      </div>
      <img
        className='weatherIcon'
        src={`/assets/icons/${findImageByCode(data.current.codeIcon?.toString() || '1000')}`}
      />
    </div>
  )
}

export default MainCard
