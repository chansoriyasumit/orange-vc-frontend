import { User } from './User';

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface IAuthRepository {
  signUp(data: SignUpData): Promise<User>;
  signIn(data: SignInData): Promise<User>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  resendVerificationEmail(): Promise<void>;
  onAuthStateChange(callback: (user: User | null) => void): () => void;
}
