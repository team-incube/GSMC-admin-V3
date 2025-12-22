import { RoleType } from '@/entities/member/model/member';

export interface AuthTokenType {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  role: RoleType;
}
