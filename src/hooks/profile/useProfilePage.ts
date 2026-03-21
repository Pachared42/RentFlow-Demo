"use client";

import * as React from "react";

type ProfileForm = {
  avatarUrl: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  provider: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  nationalId: string;
  licenseNo: string;
  licenseExpiry: string;
};

export function useProfilePage() {
  const initialProfile = React.useMemo<ProfileForm>(
    () => ({
      avatarUrl: "",
      displayName: "Pachara",
      email: "pachara@example.com",
      emailVerified: true,
      provider: "Google",
      firstName: "Pachara",
      lastName: "User",
      phone: "",
      birthDate: "",
      nationalId: "",
      licenseNo: "",
      licenseExpiry: "",
    }),
    []
  );

  const [profile, setProfile] = React.useState<ProfileForm>(initialProfile);
  const [draft, setDraft] = React.useState<ProfileForm>(initialProfile);
  const [isEditing, setIsEditing] = React.useState(false);

  const startEdit = React.useCallback(() => {
    setDraft(profile);
    setIsEditing(true);
  }, [profile]);

  const cancelEdit = React.useCallback(() => {
    setDraft(profile);
    setIsEditing(false);
  }, [profile]);

  const saveEdit = React.useCallback(() => {
    setProfile(draft);
    setIsEditing(false);
  }, [draft]);

  const updateDraft =
    <K extends keyof ProfileForm>(key: K) =>
    (value: ProfileForm[K]) => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    };

  return {
    profile,
    draft,
    isEditing,
    startEdit,
    cancelEdit,
    saveEdit,
    updateDraft,
  };
}
