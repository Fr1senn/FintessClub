export interface Order {
  id: number,
  price: number,
  purchaseDate: Date,
  daysAmount: number
  userId?: number,
  subscriptionId?: number,
}
