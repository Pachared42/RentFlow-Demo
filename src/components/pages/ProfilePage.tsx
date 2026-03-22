"use client";

import * as React from "react";
import { Box, Container } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import ProfileActionCard from "@/src/components/profile/ProfileActionCard";
import ProfilePageSkeleton from "@/src/components/profile/ProfilePageSkeleton";
import ProfileSectionCard from "@/src/components/profile/ProfileSectionCard";
import { ProfileField } from "@/src/components/profile/ProfileField";

type ProfileData = {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  birthDate: string;
  lineId: string;
  emergencyName: string;
  emergencyPhone: string;
  address: string;
  emailVerified: boolean;
};

type FieldKey = keyof ProfileData | "fullName";

type FieldConfig = {
  label: string;
  key: FieldKey;
  type?: React.InputHTMLAttributes<unknown>["type"];
  editable?: boolean;
  placeholder?: string;
};

const ACCOUNT_FIELDS: FieldConfig[] = [
  {
    label: "ชื่อ-นามสกุล",
    key: "fullName",
    editable: false,
  },
  {
    label: "ชื่อจริง",
    key: "firstName",
    editable: true,
    placeholder: "กรอกชื่อจริง",
  },
  {
    label: "นามสกุล",
    key: "lastName",
    editable: true,
    placeholder: "กรอกนามสกุล",
  },
  {
    label: "ชื่อที่แสดง",
    key: "displayName",
    editable: true,
    placeholder: "กรอกชื่อที่แสดง",
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
    label: "วันเกิด",
    key: "birthDate",
    editable: true,
    type: "date",
  },
];

const CONTACT_FIELDS: FieldConfig[] = [
  {
    label: "LINE ID",
    key: "lineId",
    editable: true,
    placeholder: "กรอก LINE ID",
  },
  {
    label: "ชื่อผู้ติดต่อฉุกเฉิน",
    key: "emergencyName",
    editable: true,
    placeholder: "กรอกชื่อผู้ติดต่อ",
  },
  {
    label: "เบอร์ผู้ติดต่อฉุกเฉิน",
    key: "emergencyPhone",
    editable: true,
    placeholder: "กรอกเบอร์โทรศัพท์",
  },
];

const ADDRESS_FIELDS: FieldConfig[] = [
  {
    label: "ที่อยู่",
    key: "address",
    editable: true,
    placeholder: "กรอกที่อยู่",
  },
];

function getFullName(data: Pick<ProfileData, "firstName" | "lastName">) {
  return `${data.firstName} ${data.lastName}`.replace(/\s+/g, " ").trim();
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
        const currentValue =
          field.key === "fullName"
            ? getFullName(isEditing ? draft : profile)
            : String(isEditing ? draft[field.key] ?? "" : profile[field.key] ?? "");

        const mode =
          field.key === "fullName"
            ? "view"
            : isEditing && field.editable !== false
            ? "edit"
            : "view";

        return (
          <ProfileField
            key={String(field.key)}
            label={field.label}
            value={currentValue}
            mode={mode}
            type={field.type}
            disabled={field.key === "fullName" || field.editable === false}
            placeholder={field.placeholder}
            onChange={(value) => {
              if (field.key !== "fullName") {
                onDraftChange(field.key, value);
              }
            }}
          />
        );
      })}
    </Box>
  );
}

export default function ProfilePage() {
  const [loading] = React.useState(false);

  const [profile, setProfile] = React.useState<ProfileData>({
    firstName: "Pachara",
    lastName: "S.",
    displayName: "Pachara",
    email: "pachara@example.com",
    phone: "0812345678",
    birthDate: "2004-01-01",
    lineId: "pachara.line",
    emergencyName: "Somchai",
    emergencyPhone: "0899999999",
    address: "Bangkok, Thailand",
    emailVerified: true,
  });

  const [draft, setDraft] = React.useState<ProfileData>(profile);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleStartEdit = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(draft);
    setIsEditing(false);
  };

  const handleDraftChange = (key: keyof ProfileData, value: string) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return <ProfilePageSkeleton />;
  }

  return (
    <Box className="bg-white py-6 md:py-8">
      <Container maxWidth="lg">
        <Box className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Box className="grid gap-5">
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
              title="ข้อมูลติดต่อ"
              icon={<ContactPhoneRoundedIcon fontSize="small" />}
            >
              <ProfileFieldsGrid
                fields={CONTACT_FIELDS}
                profile={profile}
                draft={draft}
                isEditing={isEditing}
                onDraftChange={handleDraftChange}
              />
            </ProfileSectionCard>

            <ProfileSectionCard
              title="ที่อยู่"
              icon={<HomeRoundedIcon fontSize="small" />}
            >
              <ProfileFieldsGrid
                fields={ADDRESS_FIELDS}
                profile={profile}
                draft={draft}
                isEditing={isEditing}
                onDraftChange={handleDraftChange}
                columns="grid-cols-1"
              />
            </ProfileSectionCard>
          </Box>

          <Box>
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