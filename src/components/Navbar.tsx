"use client";

import * as React from "react";
import Link from "next/link";
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
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarRounded from "@mui/icons-material/DirectionsCarRounded";

import NavLink from "@/src/ui/NavLink";
import { NAV } from "@/src/constants/navigation";

type User = {
  name: string;
  email: string;
};

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (v: boolean) => () => setOpen(v);
  const isCompact = useMediaQuery("(max-width: 800px)");

  const [user, setUser] = React.useState<User | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    setUser(null);
    handleCloseMenu();
  };

  const isActive = (href: string) => pathname === href;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="bg-white/80! backdrop-blur! border-b border-slate-200"
    >
      <Container maxWidth="lg">
        <Toolbar className="px-0! flex justify-between gap-4">
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            className="flex items-center gap-2 no-underline"
          >
            <DirectionsCarRounded className="text-slate-900!" />
            <Typography className="font-bold! text-slate-900!">
              RentFlow
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box className="hidden md:flex items-center gap-1">
            {!isCompact && (
              <Box className="flex items-center gap-1">
                {NAV.map((n) => (
                  <NavLink key={n.href} href={n.href} label={n.label} />
                ))}
              </Box>
            )}
          </Box>

          {/* Right side (desktop only) */}
          {!isCompact && (
            <Box className="flex items-center gap-2">
              {!user ? (
                <>
                  <Button
                    component={Link}
                    href="/login"
                    variant="outlined"
                    className="rounded-xl! border-slate-300! text-slate-900! hover:border-slate-400!"
                    sx={{ textTransform: "none" }}
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
                      backgroundColor: "rgb(15 23 42)",
                    }}
                  >
                    สมัครสมาชิก
                  </Button>
                </>
              ) : (
                <>
                  <IconButton onClick={handleOpenMenu} className="p-1!">
                    <Avatar className="bg-slate-900! text-white!">
                      {user.name[0].toUpperCase()}
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem disabled>
                      <Box>
                        <Typography className="font-semibold! text-slate-900!">
                          {user.name}
                        </Typography>
                        <Typography className="text-xs! text-slate-500!">
                          {user.email}
                        </Typography>
                      </Box>
                    </MenuItem>

                    <Divider />

                    <MenuItem
                      component={Link}
                      href="/profile"
                      onClick={handleCloseMenu}
                    >
                      โปรไฟล์
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      href="/my-bookings"
                      onClick={handleCloseMenu}
                    >
                      การจองของฉัน
                    </MenuItem>

                    <MenuItem onClick={handleLogout} className="text-red-600!">
                      ออกจากระบบ
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}

          {/* Mobile hamburger (โชว์เฉพาะจอเล็กจริง ๆ) */}
          {isCompact && (
            <IconButton
              onClick={toggleDrawer(true)}
              aria-label="Open menu"
              className="text-slate-900!"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box className="w-80 bg-white text-slate-900 h-full flex flex-col">
          <Box className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <DirectionsCarRounded className="text-slate-900!" />
              <Typography className="font-bold! text-slate-900!">
                CarRental
              </Typography>
            </Box>
            <IconButton onClick={toggleDrawer(false)} className="p-1!">
              <CloseIcon className="text-slate-700!" />
            </IconButton>
          </Box>

          <List className="flex-1">
            {NAV.map((n) => (
              <ListItemButton
                key={n.href}
                component={Link}
                href={n.href}
                onClick={() => setOpen(false)}
                className={
                  isActive(n.href) ? "bg-slate-100!" : "hover:bg-slate-100!"
                }
              >
                <ListItemText
                  primary={n.label}
                  primaryTypographyProps={{
                    className: isActive(n.href)
                      ? "font-semibold! text-slate-900!"
                      : "text-slate-700!",
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Box className="p-4 border-t border-slate-200 flex flex-col gap-2">
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
                    backgroundColor: "rgb(15 23 42)",
                  }}
                  onClick={() => setOpen(false)}
                >
                  สมัครสมาชิก
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/profile"
                  variant="outlined"
                  fullWidth
                  className="rounded-xl! border-slate-300! text-slate-900! hover:border-slate-400!"
                  sx={{ textTransform: "none" }}
                  onClick={() => setOpen(false)}
                >
                  โปรไฟล์
                </Button>

                <Button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  variant="contained"
                  fullWidth
                  className="rounded-xl!"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgb(220 38 38)",
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
