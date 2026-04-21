"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { NAV } from "@/src/constants/navigation";
import { getRentFlowSiteMode } from "@/src/lib/tenant";
import {
  getSessionUser,
  logout as logoutRequest,
} from "@/src/services/auth/auth.service";

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
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (v: boolean) => () => setOpen(v);
  const isCompact = useMediaQuery("(max-width: 800px)");

  const [user, setUser] = React.useState<User | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
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

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = React.useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // Ignore logout errors so the UI can still recover locally.
    }

    setUser(null);
    handleCloseMenu();
    setOpen(false);
    router.push("/");
    router.refresh();
  }, [router]);

  const isActive = (href: string) => pathname === href;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="bg-white/80! backdrop-blur-xl! border-b border-slate-200/80"
    >
      <Container maxWidth="lg">
        <Toolbar className="px-0! min-h-18.5! flex justify-between gap-4">
          <Box
            component={Link}
            href="/"
            className="flex items-center gap-2 no-underline"
          >
            <Box className="relative h-8 w-8">
              <Image
                src="/RentFlow.png"
                alt="RentFlow Logo"
                fill
                className="object-contain"
                priority
              />
            </Box>

            <Box className="flex flex-col">
              <Typography className="font-black! tracking-[-0.02em] text-slate-900! leading-none!">
                RentFlow
              </Typography>
              <Typography className="text-[11px]! font-medium! text-slate-500! leading-none! mt-1!">
                Smart Car Rental
              </Typography>
            </Box>
          </Box>

          {!isCompact && (
            <Box className="flex items-center gap-2">
              {navItems.map((n) => {
                const active = isActive(n.href);

                return (
                  <Button
                    key={n.href}
                    component={Link}
                    href={n.href}
                    disableElevation
                    className="rounded-xl! px-4! py-2! min-w-0!"
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      color: active ? "rgb(15 23 42)" : "rgb(71 85 105)",
                      backgroundColor: active
                        ? "rgb(226 232 240)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: active
                          ? "rgb(226 232 240)"
                          : "rgb(226 232 240)",
                      },
                      transition: "all .12s ease-out",
                      "&:active": {
                        transform: "scale(0.96)",
                      },
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
                    className="rounded-xl! border-slate-300! text-slate-900! hover:border-slate-400!"
                    sx={{ textTransform: "none", px: 2.2 }}
                  >
                    เข้าสู่ระบบ
                  </Button>

                  <Button
                    component={Link}
                    href="/register"
                    variant="contained"
                    className="rounded-xl! font-semibold!"
                    sx={{
                      textTransform: "none",
                      px: 2.4,
                      background:
                        "linear-gradient(135deg, rgb(15 23 42), rgb(30 41 59))",
                      boxShadow: "0 10px 20px rgba(15,23,42,.15)",
                    }}
                  >
                    สมัครสมาชิก
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleOpenMenu}
                    disableRipple
                    disableTouchRipple
                    className="rounded-2xl! px-2! py-1! border border-slate-200!"
                    sx={{
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&:active": {
                        opacity: 0.85,
                      },
                      "&:focus": {
                        outline: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                      },
                      transition: "none",
                    }}
                  >
                    <Box className="flex items-center gap-2.5">
                      <Avatar
                        src={user.avatarUrl || undefined}
                        className="bg-slate-900! text-white! ring-2 ring-slate-200"
                      >
                        {user.name[0].toUpperCase()}
                      </Avatar>

                      <Box className="text-left">
                        <Typography className="text-sm! font-semibold! text-slate-900! leading-tight!">
                          {user.name}
                        </Typography>
                        <Typography className="text-[11px]! font-medium! text-slate-500! leading-none! mt-1!">
                          {user.username || "บัญชีผู้ใช้"}
                        </Typography>
                      </Box>
                    </Box>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    MenuListProps={{
                      sx: {
                        py: 0,
                        borderRadius: "inherit",
                      },
                    }}
                    slotProps={{
                      transition: {
                        timeout: 180,
                      },
                    }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        mt: 1.25,
                        minWidth: 240,
                        width: 240,
                        borderRadius: "16px",
                        border: "1px solid rgb(226 232 240)",
                        boxShadow: "0 18px 45px rgba(15,23,42,.12)",
                        overflow: "visible",
                        position: "relative",
                        transformOrigin: "top right",

                        animation: openMenu
                          ? "profileMenuIn 180ms cubic-bezier(0.22, 1, 0.36, 1)"
                          : "none",

                        "@keyframes profileMenuIn": {
                          "0%": {
                            opacity: 0,
                            transform: "translateY(-8px) scale(0.96)",
                            filter: "blur(4px)",
                          },
                          "100%": {
                            opacity: 1,
                            transform: "translateY(0) scale(1)",
                            filter: "blur(0px)",
                          },
                        },

                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: -6,
                          right: 30,
                          width: 12,
                          height: 12,
                          backgroundColor: "white",
                          transform: "rotate(45deg)",
                          borderLeft: "1px solid rgb(226 232 240)",
                          borderTop: "1px solid rgb(226 232 240)",
                          zIndex: 0,
                        },

                        "& .MuiMenu-list": {
                          p: 0,
                          borderRadius: "16px",
                          overflow: "hidden",
                          backgroundColor: "white",
                        },
                      },
                    }}
                  >
                    <Box className="relative z-1 rounded-t-2xl bg-slate-50 px-4 py-3">
                      <Typography className="font-semibold! text-slate-900!">
                        {user.name}
                      </Typography>
                      <Typography className="text-xs! text-slate-500! break-all">
                        {user.email}
                      </Typography>
                    </Box>

                    <Divider sx={{ m: 0 }} />

                    <MenuItem
                      component={Link}
                      href="/profile"
                      onClick={handleCloseMenu}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontSize: 14,
                      }}
                    >
                      โปรไฟล์
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      href="/my-bookings"
                      onClick={handleCloseMenu}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontSize: 14,
                      }}
                    >
                      การจองของฉัน
                    </MenuItem>

                    <Divider
                      sx={{
                        margin: "0 !important",
                      }}
                    />

                    <Box sx={{ p: 1 }}>
                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          minHeight: 40,
                          borderRadius: 2,
                          py: 1,
                          px: 2,
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 14,
                          color: "white",
                          backgroundColor: "rgb(220 38 38)",

                          "&:hover": {
                            backgroundColor: "rgb(185 28 28)",
                          },
                        }}
                      >
                        ออกจากระบบ
                      </MenuItem>
                    </Box>
                  </Menu>
                </>
              )}
            </Box>
          )}

          {isCompact && (
            <IconButton
              onClick={toggleDrawer(true)}
              aria-label="Open menu"
              className="text-slate-900! rounded-xl! border border-slate-200!"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box className="w-80 bg-white text-slate-900 h-full flex flex-col">
          <Box className="px-4 py-4 border-b border-slate-200 flex items-center justify-between">
            <Box className="flex items-center gap-3">
              <Box className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                <Box className="relative h-8 w-8">
                  <Image
                    src="/RentFlow.png"
                    alt="RentFlow Logo"
                    fill
                    className="object-contain"
                  />
                </Box>
              </Box>

              <Box>
                <Typography className="font-black! tracking-[-0.02em] text-slate-900! leading-none!">
                  RentFlow
                </Typography>
                <Typography className="text-[11px]! font-medium! text-slate-500! mt-1! leading-none!">
                  Smart Car Rental
                </Typography>
              </Box>
            </Box>

            <IconButton onClick={toggleDrawer(false)} className="p-1!">
              <CloseIcon className="text-slate-700!" />
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
                  className="rounded-2xl! mb-1.5!"
                  sx={{
                    px: 2,
                    py: 1.2,
                    backgroundColor: active
                      ? "rgb(241 245 249)"
                      : "transparent",
                    border: active
                      ? "1px solid rgb(226 232 240)"
                      : "1px solid transparent",
                    "&:hover": {
                      backgroundColor: "rgb(248 250 252)",
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

          <Box className="p-4 border-t border-slate-200 flex flex-col gap-3">
            {!user ? (
              <>
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  fullWidth
                  className="rounded-xl! border-slate-300! text-slate-900! hover:border-slate-400!"
                  sx={{ textTransform: "none" }}
                  onClick={() => setOpen(false)}
                >
                  เข้าสู่ระบบ
                </Button>

                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  fullWidth
                  className="rounded-xl! font-semibold!"
                  sx={{
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, rgb(15 23 42), rgb(30 41 59))",
                  }}
                  onClick={() => setOpen(false)}
                >
                  สมัครสมาชิก
                </Button>
              </>
            ) : (
              <>
                <Box className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Box
                    component={Link}
                    href="/profile"
                    onClick={() => setOpen(false)}
                    sx={{
                      display: "block",
                      transition: "all .15s ease-out",
                      "&:hover": {
                        backgroundColor: "rgb(248 250 252)",
                        borderColor: "rgb(203 213 225)",
                      },
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    <Box className="flex items-center gap-3">
                      <Avatar
                        src={user.avatarUrl || undefined}
                        className="bg-slate-900! text-white! h-11! w-11!"
                      >
                        {user.name[0].toUpperCase()}
                      </Avatar>
                      <Box className="min-w-0">
                        <Typography className="font-semibold! text-slate-900! truncate">
                          {user.name}
                        </Typography>
                        <Typography className="text-xs! text-slate-500! break-all">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Button
                  onClick={handleLogout}
                  variant="contained"
                  fullWidth
                  className="rounded-xl!"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgb(220 38 38)",
                    "&:hover": {
                      backgroundColor: "rgb(185 28 28)",
                    },
                  }}
                >
                  ออกจากระบบ
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
