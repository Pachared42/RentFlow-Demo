export type StorefrontBlock = {
  id?: string;
  type?: "text" | "feature" | "cta" | "announcement";
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
};

export type StorefrontTheme = {
  primaryColor?: string;
  accentColor?: string;
};

export type StorefrontPage = {
  id?: string;
  tenantId?: string;
  scope: "tenant" | "marketplace";
  page: string;
  theme?: StorefrontTheme;
  blocks?: StorefrontBlock[];
  isPublished?: boolean;
};
