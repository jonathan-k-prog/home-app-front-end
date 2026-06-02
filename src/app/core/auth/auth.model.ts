export interface AuthUser {
  email: string;
  name: string;
  pictureUrl?: string;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}
