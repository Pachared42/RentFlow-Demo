"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getErrorMessage, getErrorStatus } from "@/src/lib/api-error";

import ProfileActionCard from "@/src/components/profile/ProfileActionCard";
import ProfilePageSkeleton from "@/src/components/profile/ProfilePageSkeleton";
import ProfileSectionCard from "@/src/components/profile/ProfileSectionCard";
import { ProfileField } from "@/src/components/profile/ProfileField";
import { usersApi } from "@/src/services/users/users.service";

type ProfileData = {
  avatarUrl: string;
  displayName: string;
  username: string;
  email: string;
  phone: string;
  provider: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type FieldKey = keyof ProfileData;

type FieldConfig = {
  label: string;
  key: FieldKey;
  type?: React.InputHTMLAttributes<unknown>["type"];
  editable?: boolean;
  placeholder?: string;
};

const ACCOUNT_FIELDS: FieldConfig[] = [
  {
    label: "ชื่อที่แสดง",
    key: "displayName",
    editable: true,
    placeholder: "กรอกชื่อที่แสดง",
  },
  {
    label: "ชื่อผู้ใช้",
    key: "username",
    editable: false,
  },
  {
    label: "อีเมล",
    key: "email",
    editable: false,
    type: "email",
  },
  {
    label: "เบอร์โทรศัพท์",
    key: "phone",
    editable: true,
    placeholder: "กรอกเบอร์โทรศัพท์",
  },
  {
    label: "รูปโปรไฟล์ (URL)",
    key: "avatarUrl",
    editable: true,
    placeholder: "https://example.com/avatar.jpg",
  },
];

const SYSTEM_FIELDS: FieldConfig[] = [
  {
    label: "ผู้ให้บริการเข้าสู่ระบบ",
    key: "provider",
    editable: false,
  },
  {
    label: "สร้างบัญชีเมื่อ",
    key: "createdAt",
    editable: false,
  },
  {
    label: "อัปเดตล่าสุด",
    key: "updatedAt",
    editable: false,
  },
];

function formatDateTime(value: string) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getProfileDisplayName(user: {
  name?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return user.name || fullName || user.username || "";
}

function ProfileFieldsGrid({
  fields,
  profile,
  draft,
  isEditing,
  onDraftChange,
  columns = "md:grid-cols-2",
}: {
  fields: FieldConfig[];
  profile: ProfileData;
  draft: ProfileData;
  isEditing: boolean;
  onDraftChange: (key: keyof ProfileData, value: string) => void;
  columns?: string;
}) {
  return (
    <Box className={`grid gap-3 ${columns}`}>
      {fields.map((field) => {
        const currentValue = String(
          isEditing ? draft[field.key] ?? "" : profile[field.key] ?? ""
        );
        const mode = isEditing && field.editable !== false ? "edit" : "view";

        return (
          <ProfileField
            key={field.key}
            label={field.label}
            value={currentValue}
            mode={mode}
            type={field.type}
            disabled={field.editable === false}
            placeholder={field.placeholder}
            onChange={(value) => onDraftChange(field.key, value)}
          />
        );
      })}
    </Box>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [profile, setProfile] = React.useState<ProfileData | null>(null);
  const [draft, setDraft] = React.useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const res = await usersApi.getMe();
        if (cancelled) return;

        const nextProfile: ProfileData = {
          avatarUrl: res.data.avatarUrl || "",
          displayName: getProfileDisplayName(res.data),
          username: res.data.username || "",
          email: res.data.email?.includes("@") ? res.data.email : "",
          phone: res.data.phone || "",
          provider: "RentFlow",
          emailVerified: true,
          createdAt: formatDateTime(res.data.createdAt || ""),
          updatedAt: formatDateTime(res.data.updatedAt || ""),
        };

        setProfile(nextProfile);
        setDraft(nextProfile);
        setError(null);
      } catch (err: unknown) {
        if (cancelled) return;

        if (getErrorStatus(err) === 401) {
          router.replace("/login?redirect=/profile");
          return;
        }

        setError(getErrorMessage(err, "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้"));
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleStartEdit = React.useCallback(() => {
    if (!profile) return;
    setDraft(profile);
    setIsEditing(true);
  }, [profile]);

  const handleCancel = React.useCallback(() => {
    if (!profile) return;
    setDraft(profile);
    setIsEditing(false);
    setError(null);
  }, [profile]);

  const handleSave = React.useCallback(async () => {
    if (!draft) return;

    setSaving(true);
    setError(null);

    try {
      const res = await usersApi.updateMe({
        name: draft.displayName.trim(),
        phone: draft.phone.trim(),
        avatarUrl: draft.avatarUrl.trim() || undefined,
      });

      const nextProfile: ProfileData = {
        avatarUrl: res.data.avatarUrl || "",
        displayName: getProfileDisplayName(res.data),
        username: res.data.username || draft.username,
        email: res.data.email?.includes("@") ? res.data.email : "",
        phone: res.data.phone || "",
        provider: "RentFlow",
        emailVerified: true,
        createdAt: profile?.createdAt || "-",
        updatedAt: formatDateTime(res.data.updatedAt || ""),
      };

      setProfile(nextProfile);
      setDraft(nextProfile);
      setIsEditing(false);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "ไม่สามารถบันทึกข้อมูลโปรไฟล์ได้"));
    } finally {
      setSaving(false);
    }
  }, [draft, profile?.createdAt]);

  const handleDraftChange = React.useCallback(
    (key: keyof ProfileData, value: string) => {
      setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
    },
    []
  );

  if (loading || !profile || !draft) {
    return <ProfilePageSkeleton />;
  }

  return (
    <Box className="bg-white py-6 md:py-8">
      <Container maxWidth="lg">
        <Box className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Box className="grid gap-4">
            {error ? (
              <Alert severity="error" className="rounded-2xl!">
                {error}
              </Alert>
            ) : null}

            <ProfileSectionCard
              title="ข้อมูลบัญชี"
              icon={<PersonRoundedIcon fontSize="small" />}
            >
              <ProfileFieldsGrid
                fields={ACCOUNT_FIELDS}
                profile={profile}
                draft={draft}
                isEditing={isEditing}
                onDraftChange={handleDraftChange}
              />
            </ProfileSectionCard>

            <ProfileSectionCard
              title="ข้อมูลระบบ"
              icon={<InfoOutlinedIcon fontSize="small" />}
            >
              <ProfileFieldsGrid
                fields={SYSTEM_FIELDS}
                profile={profile}
                draft={draft}
                isEditing={false}
                onDraftChange={handleDraftChange}
                columns="grid-cols-1"
              />
            </ProfileSectionCard>
          </Box>

          <Box className="space-y-4">
            {saving ? (
              <Box className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <CircularProgress size={22} />
              </Box>
            ) : null}

            <ProfileActionCard
              isEditing={isEditing}
              emailVerified={profile.emailVerified}
              onStartEdit={handleStartEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
