import type { GoogleUserInfo } from "./google";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type GoogleAuthPayload = {
  accessToken: string;
  user: GoogleUserInfo;
};

export type GoogleAuthResult = {
  user: Customer;
};

export type GoogleAuthResponse = {
  success?: boolean;
  message?: string;
  data?: GoogleAuthResult;
};

export type LegacyGoogleAuthResponse = {
  success?: boolean;
  message?: string;
  user?: Customer;
};
