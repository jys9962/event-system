import { Role } from '@common/domain/role';

export interface UserPayload {
  id: string;
  name: string;
  roles: Role[];
}
