export type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  avatarUrl?: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};
