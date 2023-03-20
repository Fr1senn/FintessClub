import { Subscription } from "./subscription";

export interface Wishlist {
  id: number,
  daysAmount: number,
  userId?: number,
  subscriptionId?: number,

  subscription?: Subscription
}
