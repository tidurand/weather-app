import './WeatherDisplayer.scss'
import HourlyCard from './partials/HourlyCard'
import MainCard from './partials/MainCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import { CityData } from '../../interfaces'

interface WeatherDisplayerProps {
  cityData: CityData
}

const WeatherDisplayer: React.FC<WeatherDisplayerProps> = ({ cityData }) => {
  const getHours = new Date().getHours()

  return (
    <div className='weatherDisplayer'>
      <p className='dayText'>{cityData.location}</p>
      <MainCard data={cityData} />
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={40}
        slidesPerView={'auto'}
        initialSlide={getHours - 2}
        className='hourlyContainer'
      >
        {cityData?.day[0].hourly.map((hour, index) => (
          <SwiperSlide key={index}>
            <HourlyCard key={index} index={index} data={hour} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default WeatherDisplayer
