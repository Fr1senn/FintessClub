import { User } from "./user";

export interface Review {
  id: number,
  reviewText?: string,
  reviewDate: Date,
  estimation: number,
  userId?: number,
  subscriptionId?: number

  user: User
}
