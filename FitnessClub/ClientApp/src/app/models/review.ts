import { User } from "./user";
import { Subscription } from "./subscription";

export interface Review {
  id: number,
  reviewText?: string,
  reviewDate: Date,
  userId?: number,
  subscriptionId?: number
  estimation: number,

  subscription?: Subscription,
  user?: User
}
