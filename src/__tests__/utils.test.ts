import { findImageByCode, setThemeByCode } from '../utils/parsing'

describe('Utils Tests', () => {
  it('findImageByCode', () => {
    expect(findImageByCode('1000')).toBe('1000.svg')
    expect(findImageByCode('1063')).toBe('1063_1072_1150_1153_1180.svg')
    expect(findImageByCode('1150')).toBe('1063_1072_1150_1153_1180.svg')
    expect(findImageByCode('1180')).toBe('1063_1072_1150_1153_1180.svg')
    expect(findImageByCode('anything')).toBe(null)
  })

  it('setThemeByCode', () => {
    expect(setThemeByCode('1000')).toBe('sunny')
    expect(setThemeByCode('1066')).toBe('rainy')
    expect(setThemeByCode('1087')).toBe('stormy')
    expect(setThemeByCode('')).toBe('sunny')
    expect(setThemeByCode(undefined)).toBe('sunny')
  })
})
