"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Avatar,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { NAV } from "@/src/constants/navigation";
import { getRentFlowSiteMode } from "@/src/lib/tenant";
import { getSessionUser } from "@/src/services/auth/auth.service";

type User = {
  name: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
};

function getDisplayName(user: {
  name?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return user.name || fullName || user.username || "ผู้ใช้งาน";
}

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (v: boolean) => () => setOpen(v);
  const isCompact = useMediaQuery("(max-width: 800px)");

  const [user, setUser] = React.useState<User | null>(null);

  const siteMode = React.useMemo(() => getRentFlowSiteMode(), []);
  const navItems = React.useMemo(
    () =>
      siteMode === "marketplace"
        ? NAV
        : NAV.filter((item) => item.href !== "/shops"),
    [siteMode]
  );

  React.useEffect(() => {
    let cancelled = false;

    async function syncSession() {
      try {
        const currentUser = await getSessionUser();
        if (!cancelled) {
          setUser(
            currentUser
              ? {
                  name: getDisplayName(currentUser),
                  email: currentUser.email,
                  username: currentUser.username,
                  avatarUrl: currentUser.avatarUrl,
                }
              : null
          );
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      }
    }

    syncSession();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="border-b border-black/10 bg-white/75! backdrop-blur-2xl!"
      sx={{ color: "var(--rf-apple-ink)" }}
    >
      <Container maxWidth="lg">
        <Toolbar className="flex min-h-11! justify-between gap-4 px-0!">
          <Box
            component={Link}
            href="/"
            className="flex items-center gap-2.5 no-underline"
          >
            <Box className="relative h-5 w-5">
              <Image
                src="/RentFlow.png"
                alt="RentFlow Logo"
                fill
                className="object-contain"
                priority
              />
            </Box>

            <Box className="flex flex-col">
              <Typography className="text-[13px]! font-semibold! tracking-[-0.01em] text-[var(--rf-apple-ink)]! leading-none!">
                RentFlow
              </Typography>
              <Typography className="mt-0.5! text-[10px]! font-medium! leading-none! text-[var(--rf-apple-muted)]!">
                Smart Car Rental
              </Typography>
            </Box>
          </Box>

          {!isCompact && (
            <Box className="flex items-center gap-1">
              {navItems.map((n) => {
                const active = isActive(n.href);

                return (
                  <Button
                    key={n.href}
                    component={Link}
                    href={n.href}
                    disableElevation
                    className="min-w-0! rounded-full! px-3.5! py-1.5!"
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: active
                        ? "var(--rf-apple-ink)"
                        : "var(--rf-apple-muted)",
                      backgroundColor: active
                        ? "rgba(0,0,0,0.06)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: active
                          ? "rgba(0,0,0,0.07)"
                          : "rgba(0,0,0,0.045)",
                        color: "var(--rf-apple-ink)",
                      },
                      transition:
                        "background-color .32s ease, color .32s ease, opacity .32s ease, transform .86s cubic-bezier(0.18,0.9,0.22,1)",
                    }}
                  >
                    {n.label}
                  </Button>
                );
              })}
            </Box>
          )}

          {!isCompact && (
            <Box className="flex items-center gap-2">
              {!user ? (
                <>
                  <Button
                    component={Link}
                    href="/login"
                    variant="outlined"
                    className="rounded-full!"
                    sx={{ px: 2.2, py: 0.65, fontSize: 12 }}
                  >
                    เข้าสู่ระบบ
                  </Button>

                  <Button
                    component={Link}
                    href="/register"
                    variant="contained"
                    className="rounded-full! font-semibold!"
                    sx={{
                      px: 2.4,
                      py: 0.65,
                      fontSize: 12,
                    }}
                  >
                    สมัครสมาชิก
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    href="/profile"
                    disableRipple
                    disableTouchRipple
                    className="rounded-full! px-0! py-0!"
                    sx={{
                      backgroundColor: "transparent",
                      border: "0",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      "&:focus": {
                        outline: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                      },
                      transition:
                        "opacity .32s ease, transform .86s cubic-bezier(0.18,0.9,0.22,1)",
                    }}
                  >
                    <Box className="flex items-center gap-2.5">
                      <Avatar
                        src={user.avatarUrl || undefined}
                        className="h-8! w-8! bg-[var(--rf-apple-ink)]! text-sm! text-white!"
                      >
                        {user.name[0].toUpperCase()}
                      </Avatar>

                      <Box className="text-left">
                        <Typography className="text-[12px]! font-semibold! leading-tight! text-[var(--rf-apple-ink)]!">
                          {user.name}
                        </Typography>
                        <Typography className="mt-0.5! text-[10px]! font-medium! leading-none! text-[var(--rf-apple-muted)]!">
                          {user.username || "บัญชีผู้ใช้"}
                        </Typography>
                      </Box>
                    </Box>
                  </Button>
                </>
              )}
            </Box>
          )}

          {isCompact && (
            <IconButton
              onClick={toggleDrawer(true)}
              aria-label="เปิดเมนู"
              className="rounded-full! border border-black/10 text-[var(--rf-apple-ink)]!"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box className="flex h-full w-80 flex-col bg-[var(--rf-apple-surface-soft)] text-[var(--rf-apple-ink)]">
          <Box className="flex items-center justify-between border-b border-black/10 px-4 py-4">
            <Box className="flex items-center gap-3">
              <Box className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                <Box className="relative h-6 w-6">
                  <Image
                    src="/RentFlow.png"
                    alt="RentFlow Logo"
                    fill
                    className="object-contain"
                  />
                </Box>
              </Box>

              <Box>
                <Typography className="font-semibold! tracking-[-0.01em] text-[var(--rf-apple-ink)]! leading-none!">
                  RentFlow
                </Typography>
                <Typography className="mt-1! text-[11px]! font-medium! leading-none! text-[var(--rf-apple-muted)]!">
                  Smart Car Rental
                </Typography>
              </Box>
            </Box>

            <IconButton onClick={toggleDrawer(false)} className="rounded-full! p-1!">
              <CloseIcon className="text-[var(--rf-apple-muted)]!" />
            </IconButton>
          </Box>

          <List className="flex-1 px-4! py-4!">
            {navItems.map((n) => {
              const active = isActive(n.href);

              return (
                <ListItemButton
                  key={n.href}
                  component={Link}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="mb-1.5! rounded-2xl!"
                  sx={{
                    px: 2,
                    py: 1.2,
                    backgroundColor: active
                      ? "rgba(0,0,0,0.055)"
                      : "transparent",
                    border: active
                      ? "1px solid rgba(0,0,0,0.08)"
                      : "1px solid transparent",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.045)",
                    },
                  }}
                >
                  <ListItemText
                    primary={n.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 700 : 500,
                      color: active ? "rgb(15 23 42)" : "rgb(51 65 85)",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Box className="flex flex-col gap-3 border-t border-black/10 p-4">
            {!user ? (
              <>
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  fullWidth
                  className="rounded-full!"
                  onClick={() => setOpen(false)}
                >
                  เข้าสู่ระบบ
                </Button>

                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  fullWidth
                  className="rounded-full! font-semibold!"
                  onClick={() => setOpen(false)}
                >
                  สมัครสมาชิก
                </Button>
              </>
            ) : (
              <>
                <Box className="rounded-[24px] border border-black/10 bg-white px-4 py-3">
                  <Box
                    component={Link}
                    href="/profile"
                    onClick={() => setOpen(false)}
                    sx={{
                      display: "block",
                      transition:
                        "opacity .32s ease, transform .86s cubic-bezier(0.18,0.9,0.22,1)",
                      "&:hover": {
                        backgroundColor: "transparent",
                        transform: "scale(1.006)",
                      },
                    }}
                  >
                    <Box className="flex items-center gap-3">
                      <Avatar
                        src={user.avatarUrl || undefined}
                        className="h-11! w-11! bg-[var(--rf-apple-ink)]! text-white!"
                      >
                        {user.name[0].toUpperCase()}
                      </Avatar>
                      <Box className="min-w-0">
                        <Typography className="truncate font-semibold! text-[var(--rf-apple-ink)]!">
                          {user.name}
                        </Typography>
                        <Typography className="break-all text-xs! text-[var(--rf-apple-muted)]!">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Button
                  component={Link}
                  href="/profile"
                  variant="outlined"
                  fullWidth
                  className="rounded-full!"
                  onClick={() => setOpen(false)}
                >
                  จัดการบัญชี
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
