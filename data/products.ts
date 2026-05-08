export interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
  ingredients: string[]
  featured: boolean
  badge?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Croissant Bơ Pháp',
    price: 35000,
    description: 'Croissant giòn tan nhiều lớp, béo ngậy với bơ Pháp thượng hạng. Ăn kèm cà phê sáng là tuyệt vời nhất.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop',
    category: 'Bánh mì',
    ingredients: ['Bột mì cao cấp', 'Bơ Pháp', 'Muối biển', 'Men tự nhiên', 'Sữa tươi'],
    featured: true,
    badge: 'Bán chạy nhất',
  },
  {
    id: 2,
    name: 'Donut Socola',
    price: 28000,
    description: 'Donut mềm mại phủ socola đen đậm đà, nhân kem tươi. Ngọt vừa, béo nhẹ – không quá ngọt như donut thường.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop',
    category: 'Bánh ngọt',
    ingredients: ['Bột mì', 'Trứng gà', 'Socola Bỉ', 'Đường', 'Kem tươi'],
    featured: true,
    badge: 'Mới',
  },
  {
    id: 3,
    name: 'Tiramisu Cốc',
    price: 55000,
    description: 'Tiramisu theo kiểu Ý truyền thống – lớp kem mascarpone mịn màng, ladyfinger ngấm cà phê espresso.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&auto=format&fit=crop',
    category: 'Bánh ngọt',
    ingredients: ['Mascarpone Ý', 'Espresso', 'Ladyfinger', 'Trứng', 'Cacao nguyên chất'],
    featured: true,
  },
  {
    id: 4,
    name: 'Bánh Mì Combo Sáng',
    price: 65000,
    description: 'Set sáng lý tưởng: 2 ổ bánh mì vỏ giòn + 1 hũ mứt việt quất + bơ lạt Anchor. Giao trước 8 giờ sáng.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80&auto=format&fit=crop',
    category: 'Combo',
    ingredients: ['Bánh mì vỏ giòn', 'Bơ Anchor', 'Mứt việt quất', 'Muối hồng'],
    featured: true,
    badge: 'Combo tiết kiệm',
  },
  {
    id: 5,
    name: 'Pain au Chocolat',
    price: 38000,
    description: 'Bánh lớp phồng nhân socola đen – mỗi lần cắn là một lớp giòn tan và socola nóng chảy bên trong.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=600&q=80&auto=format&fit=crop',
    category: 'Bánh mì',
    ingredients: ['Bột mì', 'Bơ Pháp', 'Socola đen 70%', 'Men'],
    featured: false,
  },
  {
    id: 6,
    name: 'Bánh Mousse Dâu',
    price: 62000,
    description: 'Mousse dâu tây tươi mát – lớp bánh xốp mỏng, mousse dâu mịn nhẹ, mirror glaze ánh đỏ bắt mắt.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80&auto=format&fit=crop',
    category: 'Bánh ngọt',
    ingredients: ['Dâu tây tươi', 'Kem whipping', 'Gelatin', 'Đường', 'Biscuit'],
    featured: false,
  },
]

export const categories = ['Tất cả', 'Bánh mì', 'Bánh ngọt', 'Combo']
