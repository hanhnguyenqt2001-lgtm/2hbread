// Real customer reviews copied from the shop's Google Maps page (public reviewer name, stars, text).
// Leave empty to show only the "write a review" call-to-action. Never invent reviews.

export interface Review {
  name: string
  rating: number
  text: string
  date?: string
}

export const reviews: Review[] = []
