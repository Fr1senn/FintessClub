import { Discount } from "./discount"
import { Order } from "./order"
import { Review } from "./review"
import { Wishlist } from "./wishlist"

export interface Subscription {
  id: number,
  pricePerDay: number,
  title: NonNullable<string>,
  rating: number,

  discounts: Array<Discount>,
  orders: Array<Order>,
  reviews: Array<Review>,
  wishlists: Array<Wishlist>
}
