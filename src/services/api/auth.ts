import { publicRequest } from "../axios";

export interface LoginPayload {
  whatsapp_number: string;
  password: string;
  role: "admin";
}

export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  token_type?: string;
}

const login = (payload: LoginPayload) =>
  publicRequest.post<LoginResponse>("/api/auth/login", payload);

const AuthService = { login };

export default AuthService;
