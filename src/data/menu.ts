import type { Lang } from '../i18n/dictionary';
import type { PhotoKey } from './images';

export type MenuCategory = 'viennoiserie' | 'patisserie' | 'coffee' | 'sets';

type Localized = Record<Lang, string>;

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: Localized;
  price: Localized;
  meta: Localized;
  photo: PhotoKey;
  signature?: boolean;
  pairing?: Localized;
}

export const MENU_CATEGORIES: Array<'all' | MenuCategory> = ['all', 'viennoiserie', 'patisserie', 'coffee', 'sets'];

export const MENU: MenuItem[] = [
  {
    id: 'croissant-beurre',
    category: 'viennoiserie',
    name: 'Croissant au beurre',
    description: {
      ru: 'Эталонный круассан: 27 слоёв, масло AOP 82% и корочка, которая рассыпается на тысячу золотых осколков.',
      en: 'The benchmark croissant: 27 layers, 82% AOP butter and a crust that shatters into a thousand golden flakes.',
    },
    price: { ru: '290 ₽', en: '€3.80' },
    meta: { ru: '90 г', en: '90 g' },
    photo: 'croissantDarkPlate',
    signature: true,
    pairing: { ru: 'Эспрессо', en: 'Espresso' },
  },
  {
    id: 'pain-chocolat',
    category: 'viennoiserie',
    name: 'Pain au chocolat',
    description: {
      ru: 'Две палочки бельгийского шоколада 64% в хрустящем ламинированном тесте.',
      en: 'Two batons of 64% Belgian chocolate wrapped in crisp laminated dough.',
    },
    price: { ru: '320 ₽', en: '€4.20' },
    meta: { ru: '95 г', en: '95 g' },
    photo: 'painChocolat',
    pairing: { ru: 'Капучино', en: 'Cappuccino' },
  },
  {
    id: 'croissant-amandes',
    category: 'viennoiserie',
    name: 'Croissant aux amandes',
    description: {
      ru: 'Дважды испечённый круассан с франжипаном, лепестками миндаля и облаком сахарной пудры.',
      en: 'Twice-baked croissant filled with frangipane, topped with flaked almonds and a cloud of icing sugar.',
    },
    price: { ru: '380 ₽', en: '€4.90' },
    meta: { ru: '130 г', en: '130 g' },
    photo: 'almondPair',
    signature: true,
    pairing: { ru: 'Flat white', en: 'Flat white' },
  },
  {
    id: 'croissant-praline',
    category: 'viennoiserie',
    name: 'Croissant praliné',
    description: {
      ru: 'Круассан с тёмным шоколадом 70% и пралине из обжаренного фундука внутри каждого слоя.',
      en: 'A croissant layered with 70% dark chocolate and roasted hazelnut praliné.',
    },
    price: { ru: '340 ₽', en: '€4.40' },
    meta: { ru: '110 г', en: '110 g' },
    photo: 'chocolateCroissant',
  },
  {
    id: 'kouign-amann',
    category: 'patisserie',
    name: 'Kouign-amann',
    description: {
      ru: 'Бретонская классика: слоёное тесто, солёное масло и хрустящая карамельная корка.',
      en: 'A Breton classic: laminated dough, salted butter and a crackling caramel crust.',
    },
    price: { ru: '360 ₽', en: '€4.60' },
    meta: { ru: '110 г', en: '110 g' },
    photo: 'kouignDark',
    signature: true,
    pairing: { ru: 'Flat white', en: 'Flat white' },
  },
  {
    id: 'macarons',
    category: 'patisserie',
    name: 'Macarons · 6',
    description: {
      ru: 'Шесть вкусов недели: фисташка, малина, солёная карамель, ваниль, лимон и чёрная смородина.',
      en: 'Six flavours of the week: pistachio, raspberry, salted caramel, vanilla, lemon and blackcurrant.',
    },
    price: { ru: '540 ₽', en: '€7.00' },
    meta: { ru: '6 шт.', en: '6 pcs' },
    photo: 'macarons',
  },
  {
    id: 'tartes',
    category: 'patisserie',
    name: 'Tarte aux fruits',
    description: {
      ru: 'Песочная основа sablé breton, ванильный крем и сезонные ягоды под зеркальной глазурью.',
      en: 'Sablé breton base, vanilla cream and seasonal berries under a mirror glaze.',
    },
    price: { ru: '450 ₽', en: '€5.80' },
    meta: { ru: '140 г', en: '140 g' },
    photo: 'tarts',
  },
  {
    id: 'espresso',
    category: 'coffee',
    name: 'Espresso',
    description: {
      ru: 'Двойной ристретто на зерне Эфиопии: ноты бергамота, тёмного шоколада и мёда.',
      en: 'A double ristretto of Ethiopian beans: notes of bergamot, dark chocolate and honey.',
    },
    price: { ru: '190 ₽', en: '€2.60' },
    meta: { ru: '40 мл', en: '40 ml' },
    photo: 'espressoGlass',
  },
  {
    id: 'cappuccino',
    category: 'coffee',
    name: 'Cappuccino',
    description: {
      ru: 'Бархатная микропена и плотный эспрессо — в идеальной пропорции один к трём.',
      en: 'Velvety microfoam over a dense espresso in a perfect one-to-three ratio.',
    },
    price: { ru: '260 ₽', en: '€3.40' },
    meta: { ru: '180 мл', en: '180 ml' },
    photo: 'cappuccino',
    signature: true,
  },
  {
    id: 'flat-white',
    category: 'coffee',
    name: 'Flat white',
    description: {
      ru: 'Двойной эспрессо и тонкий слой шелковистого молока. Для тех, кто любит вкус кофе.',
      en: 'Double espresso under a thin layer of silky milk. For those who love the taste of coffee.',
    },
    price: { ru: '280 ₽', en: '€3.60' },
    meta: { ru: '160 мл', en: '160 ml' },
    photo: 'flatWhite',
  },
  {
    id: 'petit-dejeuner',
    category: 'sets',
    name: 'Petit-déjeuner',
    description: {
      ru: 'Утренний сет: круассан, pain au chocolat, капучино и свежевыжатый апельсиновый сок.',
      en: 'Morning set: croissant, pain au chocolat, cappuccino and fresh orange juice.',
    },
    price: { ru: '790 ₽', en: '€10.50' },
    meta: { ru: 'до 12:00', en: 'until noon' },
    photo: 'breakfastSet',
    signature: true,
  },
  {
    id: 'gouter',
    category: 'sets',
    name: 'Le goûter à deux',
    description: {
      ru: 'Сет на двоих: четыре вида выпечки, макаронс и два напитка на выбор.',
      en: 'A set for two: four pastries, macarons and two drinks of your choice.',
    },
    price: { ru: '1 490 ₽', en: '€19.00' },
    meta: { ru: 'на двоих', en: 'for two' },
    photo: 'cafeTable',
  },
];
