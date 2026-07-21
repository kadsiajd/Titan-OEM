export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginSuccessResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AdminLoginResponse {
  token: string;
  isAdmin: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AuthError {
  message: string;
  statusCode?: number;
}
