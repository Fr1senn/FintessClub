export interface Review {
  id: number,
  review?: string,
  reviewDate: Date,
  rating: number,
  userId?: number,
  subscriptionId?: number
}
