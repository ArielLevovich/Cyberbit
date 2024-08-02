import { UserRole } from './enums/user-roles';

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole;
}
