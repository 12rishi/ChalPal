import { Request } from "express";

export interface loginData {
  email: string;
  password: string;
}
export interface UserData extends loginData {
  userName: string;
  otp?: number;
  otpGenerateTime?: number;
  verified?: boolean;

  confirmPassword: string;
}
export interface AuthRequest extends Request {
  userId?: string;
}
export interface NodeMailerData {
  from: string;
  to: string;
  subject: string;
  text: string;
}
