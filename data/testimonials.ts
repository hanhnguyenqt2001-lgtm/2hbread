export interface Testimonial {
  id: number
  name: string
  avatar: string
  role: string
  comment: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nguyễn Minh Anh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MinhAnh&backgroundColor=b6e3f4',
    role: 'Khách hàng thường xuyên',
    comment: 'Croissant của 2HBread là ngon nhất mình từng ăn ở Việt Nam! Giòn đúng kiểu, bơ thơm không ngấy. Giao hàng nhanh, đóng gói đẹp lắm.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Trần Hải Đăng',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HaiDang&backgroundColor=ffdfbf',
    role: 'Food blogger',
    comment: 'Tiramisu ở đây chuẩn vị Ý, không bị ngọt quá. Mình đã order 3 lần trong tháng này rồi. Sẽ còn quay lại nhiều hơn!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lê Thu Hương',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThuHuong&backgroundColor=c0aede',
    role: 'Mẹ 2 con',
    comment: 'Đặt bánh mì combo sáng cho cả nhà, các bé rất thích. Bánh tươi, mềm ngon. Giá hợp lý nữa. Sẽ đặt thường xuyên!',
    rating: 5,
  },
]
