import { Subscription } from "./subscription"
import { User } from "./user"

export interface Order {
  id: number,
  price: number,
  purchaseDate: Date,
  daysAmount: number
  userId?: number,
  subscriptionId?: number,

  user?: User,
  subscription?: Subscription
}
