export interface Review {
  id: number,
  review?: string,
  reviewDate: Date,
  estimation: number,
  userId?: number,
  subscriptionId?: number
}
