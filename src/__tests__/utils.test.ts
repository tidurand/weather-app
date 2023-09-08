import { findImageByCode, setThemeByCode } from '../utils/parsing'

describe('findImageByCode', () => {
  it('should find one', () => {
    expect(findImageByCode('1000')).toBe('1000.svg')
  })
  it('should find the first', () => {
    expect(findImageByCode('1063')).toBe('1063_1072_1150_1153_1180.svg')
  })
  it('should find in middle', () => {
    expect(findImageByCode('1150')).toBe('1063_1072_1150_1153_1180.svg')
  })
  it('should find the last', () => {
    expect(findImageByCode('1180')).toBe('1063_1072_1150_1153_1180.svg')
  })
  it('should find nothing and return null', () => {
    expect(findImageByCode('anything')).toBe(null)
  })
})

describe('setThemeByCode', () => {
  it('should return rainy', () => {
    expect(setThemeByCode('1066')).toBe('rainy')
  })
  it('nothing return sunny', () => {
    expect(setThemeByCode(undefined)).toBe('sunny')
  })
})
