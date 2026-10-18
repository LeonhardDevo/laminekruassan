const PHOTOS = {
  heroSugarDust: '1555507036-ab1f4038808a',
  layersMacro: '1700915704616-b455b3679024',
  flourHands: '1549590143-d5855148a9d5',
  kneading: '1517686469429-8bdb88b9f907',
  doughBall: '1598634549802-dcc558705f19',
  goldenTray: '1693483640461-267d788b6148',
  espressoPour: '1772134141698-c47b78663c55',
  espressoGlass: '1583165278997-0250ea5d72e2',
  croissantDarkPlate: '1612366747681-e4ca6992b1e9',
  croissantCoffee: '1769138886199-7cc55bf86da5',
  croissantBowl: '1771054934948-feff2cece732',
  painChocolat: '1682655013286-b94ae4f6f771',
  chocolateCroissant: '1564354273277-c6d4b8532100',
  almondPair: '1589007797526-ed40d157365d',
  kouignDark: '1614205569927-1f104e088eee',
  macarons: '1558326567-98ae2405596b',
  tarts: '1776797142667-dcee509ff200',
  cappuccino: '1497636577773-f1231844b336',
  flatWhite: '1579265898841-79c7890d69cf',
  latteArt: '1762402519375-a29d7971a761',
  lattePour: '1541167760496-1628856ab772',
  breakfastSet: '1763647872237-c76e660cf38b',
  cafeTable: '1542372147193-a7aca54189cd',
  salonInterior: '1657498023828-1e0181449d9f',
  pastryShowcase: '1767379755386-1b213fb63c07',
  vitrine: '1705972018470-a89eda1c6ce4',
} as const;

export type PhotoKey = keyof typeof PHOTOS;

export const photo = (key: PhotoKey, width = 1200, height?: number) =>
  `https://images.unsplash.com/photo-${PHOTOS[key]}?auto=format&fit=crop&w=${width}${
    height ? `&h=${height}` : ''
  }&q=80`;

export const photoSrcSet = (key: PhotoKey, widths = [640, 960, 1400, 2000]) =>
  widths.map((w) => `${photo(key, w)} ${w}w`).join(', ');
