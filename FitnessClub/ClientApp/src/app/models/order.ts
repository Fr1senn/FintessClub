export interface Order {
  id: number,
  price: number,
  purchaseDate: Date,
  userId?: number,
  subscriptionId?: number,
  durationId?: number
}
