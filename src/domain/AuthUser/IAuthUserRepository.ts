import type { IAuthRepository } from '../interfaces/IAuthRepository';
import type {
  AuthSignUpParams,
  AuthUpdatePasswordParams,
  AuthUpdateProfileParams,
  AuthUser,
} from './types';

export interface IAuthUserRepository extends IAuthRepository {
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  signUp: (params: AuthSignUpParams) => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
  getUser: () => Promise<AuthUser>;
  updateProfile: (params: AuthUpdateProfileParams) => Promise<void>;
  updatePassword: (params: AuthUpdatePasswordParams) => Promise<void>;
}
