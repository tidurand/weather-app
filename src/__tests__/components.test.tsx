import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import SearchBar from '../components/SearchBar/SearchBar'
import WeatherDisplayer from '../components/WeatherDisplayer/WeatherDisplayer'
import { fakeData } from '../utils/fakeData'

describe('SearchBar Tests', () => {
  it('SearchBar', async () => {
    const fn = vi.fn()
    render(<SearchBar setCity={fn} />)
    const input = screen.getByRole('combobox')
    expect(input).toBeInTheDocument()
    await userEvent.type(input, 'abcd')
    const suggestion = screen.getByText('No options')
    expect(suggestion).toBeInTheDocument()
  })
})

describe('Displayer Tests', () => {
  it('Displayer', () => {
    render(<WeatherDisplayer cityData={fakeData} />)
    const text = screen.getByText('FakeParis')
    expect(text).toHaveTextContent('FakeParis')
  })
  it('Hourly Cards', () => {
    const { container } = render(<WeatherDisplayer cityData={fakeData} />)
    const HourlyCardsNumber = container.getElementsByClassName('hourlyCard').length
    expect(HourlyCardsNumber).toBe(24)
  })
})
