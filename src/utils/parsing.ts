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
