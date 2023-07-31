import './MainCard.scss'

interface MainCardProps {}

const MainCard: React.FC<MainCardProps> = () => {
  return (
    <div className='mainCard'>
      <div className='mainInformations'>
        <p className='temperature'>20°</p>
        <p>Partiellement nuageux</p>
        <p>Min: 12° Max: 20°</p>
      </div>
      <div className='additionnalInformations'>
        <div className='wind'>
          <img src='/src/assets/wind.png' title='wind icon' width='32px' />
          <p>10km/h</p>
          <p>Vent</p>
        </div>
        <div className='humidity'>
          <img src='/src/assets/humidity.png' title='humidity icon' width='32px' />
          <p>50%</p>
          <p>Humidité</p>
        </div>
      </div>
      <img className='weatherIcon' src='https://cdn.weatherapi.com/weather/128x128/day/116.png' />
    </div>
  )
}

export default MainCard
