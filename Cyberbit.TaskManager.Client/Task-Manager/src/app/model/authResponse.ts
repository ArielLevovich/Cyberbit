import { UserRole } from './enums/user-roles';

export interface AuthResponse {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole;
  token: string
}

