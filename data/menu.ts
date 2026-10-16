// Menu from the shop's menu.docx (names/descriptions lightly polished).
// Images live in public/images/menu/ (converted from the docx: max 1200px JPEG).

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  unit?: string
  category: string
  image?: string
  featured?: boolean
  badge?: string
}

export const categories = ['Tất cả', 'Bún & bánh ướt', 'Bánh mì', 'Đặc sản Huế']

const img = (id: string) => `/images/menu/${id}.jpg`

export const menu: MenuItem[] = [
  {
    id: 'bun-thit-nuong-sot-dau-phong',
    name: 'Bún thịt nướng sốt đậu phộng',
    description:
      'Thịt nướng ướp sả thơm lừng, đậm vị, ăn cùng bún tươi, rau sống và đậu phộng rang – chan nước lèo sốt đậu phộng béo bùi, đặc trưng Lao Bảo, Quảng Trị.',
    price: 35000,
    unit: 'phần',
    category: 'Bún & bánh ướt',
    image: img('bun-thit-nuong-sot-dau-phong'),
    featured: true,
    badge: 'Bán chạy',
  },
  {
    id: 'banh-uot-thit-nuong',
    name: 'Bánh ướt thịt nướng',
    description:
      'Bánh ướt mỏng mềm, thịt nướng thơm lừng, chả lụa, rau sống và đồ chua – chấm nước lèo đậu phộng đậm đà chuẩn vị miền Trung.',
    price: 35000,
    unit: 'phần',
    category: 'Bún & bánh ướt',
    image: img('banh-uot-thit-nuong'),
  },
  {
    id: 'bun-thit-luoc-nuoc-tuong',
    name: 'Bún thịt luộc nước tương',
    description:
      'Thịt luộc mềm thơm, đậu hũ chiên giòn rụm cùng rau thơm tươi mát, hoà quyện trong nước tương đậm đà.',
    price: 35000,
    unit: 'phần',
    category: 'Bún & bánh ướt',
    image: img('bun-thit-luoc-nuoc-tuong'),
    badge: 'Ăn là ghiền',
  },
  {
    id: 'bun-thit-luoc-mam-nem',
    name: 'Bún thịt luộc mắm nêm',
    description:
      'Thịt luộc và chả giò giòn rụm, thêm rau thơm, dưa leo, đồ chua – chấm mắm nêm cá cơm thơm nồng, đậm đà vị miền Trung.',
    price: 35000,
    unit: 'phần',
    category: 'Bún & bánh ướt',
    image: img('bun-thit-luoc-mam-nem'),
  },
  {
    id: 'bun-dau-nuoc-tuong-chay',
    name: 'Bún đậu nước tương chay',
    description:
      'Đậu hũ chiên vàng giòn, xà lách, rau thơm và đồ chua, dùng với nước tương – bữa ăn thanh đạm, nhẹ bụng.',
    price: 25000,
    unit: 'phần',
    category: 'Bún & bánh ướt',
    image: img('bun-dau-nuoc-tuong-chay'),
    badge: 'Món chay',
  },
  {
    id: 'banh-mi-thit-nuong',
    name: 'Bánh mì thịt nướng',
    description: 'Ổ bánh mì giòn rụm kẹp thịt nướng thơm vị sả, thêm dưa leo, rau thơm và đồ chua.',
    price: 20000,
    unit: 'ổ',
    category: 'Bánh mì',
    image: img('banh-mi-thit-nuong'),
    badge: 'Bán chạy',
  },
  {
    id: 'banh-mi-thit-nuong-trung',
    name: 'Bánh mì thịt nướng trứng ốp la',
    description: 'Thịt nướng thơm sả cùng một trứng ốp la nóng hổi, thêm rau thơm, dưa leo và đồ chua.',
    price: 25000,
    unit: 'ổ',
    category: 'Bánh mì',
    image: img('banh-mi-thit-nuong-trung'),
  },
  {
    id: 'banh-mi-thap-cam',
    name: 'Bánh mì thập cẩm',
    description:
      'Thịt nướng giòn thơm vị sả gặp 2 chiếc bánh bột lọc tôm thịt, thêm rau thơm, dưa leo và đồ chua – một sự kết hợp không đụng hàng.',
    price: 25000,
    unit: 'ổ',
    category: 'Bánh mì',
    image: img('banh-mi-thap-cam'),
    badge: 'Độc đáo',
  },
  {
    id: 'banh-mi-bot-loc',
    name: 'Bánh mì bột lọc',
    description:
      'Ổ bánh mì kẹp 3 bánh bột lọc nhân tôm thịt, cà rốt và đu đủ ngâm chua, dưa leo, rau thơm, xà lách – rưới nước mắm đặc biệt, hương vị có một không hai.',
    price: 25000,
    unit: 'ổ',
    category: 'Bánh mì',
    image: img('banh-mi-bot-loc'),
    badge: 'Đặc sản Huế – Đà Nẵng',
  },
  {
    id: 'banh-mi-trung',
    name: 'Bánh mì trứng',
    description: 'Bánh mì với 2 trứng ốp la, thêm rau thơm, xà lách và dưa chua – bữa sáng nhanh gọn, chắc bụng.',
    price: 20000,
    unit: 'ổ',
    category: 'Bánh mì',
    image: img('banh-mi-trung'),
  },
  {
    id: 'banh-loc-hue',
    name: 'Bánh lọc Huế',
    description:
      '9 chiếc bánh lọc dai trong, nhân tôm thịt đậm đà, chấm nước mắm ớt cay nhẹ – chuẩn vị Huế.',
    price: 35000,
    unit: 'phần 9 cái',
    category: 'Đặc sản Huế',
    image: img('banh-loc-hue'),
    featured: true,
    badge: 'Đặc sản Huế',
  },
]
