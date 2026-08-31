export interface AuthUser {
  email: string;
  name: string;
  pictureUrl?: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}
