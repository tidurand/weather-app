import './WeatherDisplayer.scss'
import HourlyCard from './partials/HourlyCard'
import MainCard from './partials/MainCard'
import useCity from '../../hooks/useCity'
import { fakeData } from '../../utils/fakeData'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'

interface WeatherDisplayerProps {
  city: string
}

const WeatherDisplayer: React.FC<WeatherDisplayerProps> = ({ city }) => {
  const cityData = useCity(city)
  const getHours = new Date().getHours()

  return (
    <div className='weatherDisplayer'>
      <p className='dayText'>{cityData?.location || fakeData.location}</p>
      <MainCard data={cityData || fakeData} />
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
        {!cityData &&
          fakeData?.day[0].hourly.map((hour, index) => (
            <SwiperSlide key={index}>
              <HourlyCard key={index} index={index} data={hour} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default WeatherDisplayer
