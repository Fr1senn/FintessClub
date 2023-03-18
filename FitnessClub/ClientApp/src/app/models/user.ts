import { Order } from "./order";
import { Review } from "./review";
import { TrainingSchedule } from "./trainingSchedule";
import { Wishlist } from "./wishlist";
import { Attendance } from "./attendance";
import { Role } from "./role";

export interface User {
  id: number,
  firstName: NonNullable<string>,
  lastName: NonNullable<string>,
  email: NonNullable<string>,
  password: NonNullable<string>,
  birthDate: NonNullable<Date>,
  registrationDate: Date,
  roleId?: number,

  attendances: Attendance[]
  orders: Order[],
  reviews: Review[],
  role?: Role,
  trainingSchedules: TrainingSchedule[],
  wishlists: Wishlist[],
}
