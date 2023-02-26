export interface User {
  id: number,
  firstName: NonNullable<string>,
  lastName: NonNullable<string>,
  email?: string,
  password: NonNullable<string>,
  birthDate: Date,
  registrationDate: Date,
  roleId?: number
}
