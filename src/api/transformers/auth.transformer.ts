import type { ApiLoginUser } from '../types/auth.api';
import type { User } from '@/models/user.model';

export function transformUser(user: ApiLoginUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
}
