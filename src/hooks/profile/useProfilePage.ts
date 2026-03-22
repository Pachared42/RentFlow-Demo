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
      avatarUrl: "https://scontent.fbkk19-1.fna.fbcdn.net/v/t39.30808-6/466361511_2303343033349558_5826289753432355137_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=bgnXGiwuzYMQ7kNvwFXH5Y9&_nc_oc=AdpRyCzReL32NA6xB2FWjoG9KspIsusxULXC97IYCH-MBQcQEVX0GimdYJ0g3E8IifU&_nc_zt=23&_nc_ht=scontent.fbkk19-1.fna&_nc_gid=r-5067m7tNZ_va67fSksMw&_nc_ss=7a32e&oh=00_AfxwNpvc1fhBQf4QRH5yytZfzDYFKQiljqMHgxqwmNxUNw&oe=69C5D0BC",
      displayName: "พชร",
      email: "pachared.amr12@gmail.com",
      emailVerified: true,
      provider: "Google",
      firstName: "พชร",
      lastName: "กาฬภักดี",
      phone: "0655908105",
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
