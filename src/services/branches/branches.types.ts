// src/services/branches/branches.types.ts
export type Branch = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  lat?: number;
  lng?: number;
  openTime?: string;
  closeTime?: string;
  isActive: boolean;
};
