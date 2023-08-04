import { Informations } from '../../../interfaces'
import { findImageByCode } from '../../../utils/parsing'
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
        src={`/src/assets/icons/${findImageByCode(data.codeIcon?.toString() || '1000')}`}
        width='64px'
      />
      <p className='temp'>{data.temp}°</p>
    </div>
  )
}

export default HourlyCard
