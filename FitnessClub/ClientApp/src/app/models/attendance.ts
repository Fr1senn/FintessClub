import { User } from "./user";

export interface Attendance {
  id: number,
  attendanceDate: Date,
  userId?: number,

  user?: User
}
