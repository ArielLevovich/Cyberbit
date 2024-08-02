import { UserRole } from './enums/user-roles';

export interface UserDetails {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole;
}
