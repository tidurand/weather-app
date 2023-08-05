const imageList = [
  '1000.svg',
  '1000_night.svg',
  '1003.svg',
  '1003_night.svg',
  '1006_1009.svg',
  '1030.svg',
  '1063_1072_1150_1153_1180.svg',
  '1063_1072_1150_1153_1180_night.svg',
  '1066_1069_1210_1216_1222.svg',
  '1066_1069_1210_1216_1222_night.svg',
  '1087_1273_1279.svg',
  '1087_1273_1279_night.svg',
  '1114_1117_1168_1171_1204_1207_1213_1219_1225_1237_1249_1252_1255_1258_1261_1264.svg',
  '1135_1147.svg',
  '1183_1240.svg',
  '1186.svg',
  '1186_night.svg',
  '1189_1243.svg',
  '1192.svg',
  '1192_night.svg',
  '1195_1246.svg',
  '1198.svg',
  '1198_night.svg',
  '1201.svg',
  '1276_1282.svg',
]

const backgroundList = {
  sunny: ['1000'],
  suncloudy: ['1003', '1063', '1072', '1150', '1153', '1180'],
  cloudy: ['1006', '1009', '1030', '1135', '1147'],
  rainy: [
    '1066',
    '1069',
    '1210',
    '1216',
    '1222',
    '1183',
    '1240',
    '1186',
    '1189',
    '1243',
    '1192',
    '1195',
    '1246',
    '1198',
    '1201',
    '1276',
    '1282',
  ],
  snowy: [
    '1114',
    '1117',
    '1168',
    '1171',
    '1204',
    '1207',
    '1213',
    '1219',
    '1225',
    '1237',
    '1249',
    '1252',
    '1255',
    '1258',
    '1261',
    '1264',
  ],
  stormy: ['1087', '1273', '1279'],
}

export const findImageByCode = (code: string): string | null => {
  for (const fileName of imageList) {
    const regex = new RegExp('_|.svg', 'g')
    const codesInFileName = fileName.split(regex)
    if (codesInFileName.includes(code)) {
      return fileName
    }
  }
  return null
}

export const setThemeByCode = (code: string | undefined): string => {
  if (!code) return 'sunny'
  for (const [theme, codes] of Object.entries(backgroundList)) {
    if (codes.includes(code)) {
      return theme
    }
  }
  return 'sunny'
}
