export interface Discount {
  id: number,
  discountPercentage: number,
  isActive: boolean,
  subscriptionId?: number,
}
