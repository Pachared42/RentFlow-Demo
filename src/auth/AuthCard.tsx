"use client";

import * as React from "react";
import Link from "next/link";
import Script from "next/script";
import {
    Box,
    Container,
    Card,
    CardContent,
    Typography,
    Stack,
    Divider,
    CircularProgress,
    Button,
    Snackbar,
    Alert,
    Slide,
    type SlideProps,
} from "@mui/material";
import {
    useGoogleAuth,
    type SnackbarSeverity,
} from "@/src/hooks/useGoogleAuth";
import AuthCardSkeleton from "@/src/components/auth/AuthCardSkeleton";

type SnackbarState = {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
};

type AuthCardProps = {
    title: string;
    subtitle: string;
    successMessage: string;
    authErrorMessage: string;
    submitErrorMessage: string;
    agreementText: React.ReactNode;
    buttonText?: string;
    redirectTo?: string;
};

function SlideDownTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

export default function AuthCard({
    title,
    subtitle,
    successMessage,
    authErrorMessage,
    submitErrorMessage,
    agreementText,
    buttonText = "ดำเนินการต่อด้วย Google",
    redirectTo = "/",
}: AuthCardProps) {
    const [snackbar, setSnackbar] = React.useState<SnackbarState>({
        open: false,
        message: "",
        severity: "info",
    });

    const { loading, googleReady, initGoogle, handleGoogleAuth } = useGoogleAuth({
        successMessage,
        authErrorMessage,
        submitErrorMessage,
        redirectTo,
    });

    const showSnackbar = React.useCallback(
        (message: string, severity: SnackbarSeverity = "info") => {
            setSnackbar({
                open: true,
                message,
                severity,
            });
        },
        []
    );

    const closeSnackbar = React.useCallback(
        (_?: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === "clickaway") return;
            setSnackbar((prev) => ({ ...prev, open: false }));
        },
        []
    );

    React.useEffect(() => {
        if (window.google?.accounts?.oauth2) {
            initGoogle(showSnackbar);
        }
    }, [initGoogle, showSnackbar]);

    if (!googleReady && !loading) {
        return (
            <>
                <Script
                    src="https://accounts.google.com/gsi/client"
                    strategy="afterInteractive"
                    onLoad={() => initGoogle(showSnackbar)}
                />

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3500}
                    onClose={closeSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    TransitionComponent={SlideDownTransition}
                >
                    <Alert
                        onClose={closeSnackbar}
                        severity={snackbar.severity}
                        variant="filled"
                        elevation={0}
                        sx={{
                            minWidth: { xs: "calc(100vw - 32px)", sm: 420 },
                            maxWidth: 520,
                            borderRadius: "14px",
                            fontWeight: 600,
                            boxShadow:
                                "0 10px 30px rgba(15, 23, 42, 0.10), 0 2px 10px rgba(15, 23, 42, 0.06)",
                            alignItems: "center",
                        }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>

                <AuthCardSkeleton />
            </>
        );
    }

    return (
        <Box className="relative bg-white">
            <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onLoad={() => initGoogle(showSnackbar)}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                TransitionComponent={SlideDownTransition}
            >
                <Alert
                    onClose={closeSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    elevation={0}
                    sx={{
                        minWidth: { xs: "calc(100vw - 32px)", sm: 420 },
                        maxWidth: 520,
                        borderRadius: "14px",
                        fontWeight: 600,
                        boxShadow:
                            "0 10px 30px rgba(15, 23, 42, 0.10), 0 2px 10px rgba(15, 23, 42, 0.06)",
                        alignItems: "center",
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Box aria-hidden className="pointer-events-none fixed inset-0" />

            <Container maxWidth="sm" className="relative py-12">
                <Card
                    elevation={0}
                    className="w-full rounded-2xl! border border-slate-200 bg-white"
                    sx={{
                        boxShadow: "none",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    <CardContent className="p-8!">
                        <Stack className="mb-6 items-center text-center">
                            <Box
                                className="mb-3 grid h-12 w-50 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm"
                                sx={{ boxShadow: "none" }}
                            >
                                <Typography className="text-base font-black text-slate-900">
                                    RentFlow
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack spacing={1} className="mb-4 items-center text-center">
                            <Typography variant="h5" className="text-xl font-bold text-slate-900">
                                {title}
                            </Typography>

                            <Typography className="text-sm text-slate-600">
                                {subtitle}
                            </Typography>
                        </Stack>

                        <Divider className="my-5! border-slate-200!" />

                        <Stack spacing={2} className="items-center">
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => handleGoogleAuth(showSnackbar)}
                                disabled={!googleReady || loading}
                                className="rounded-xl!"
                                sx={{
                                    minHeight: 54,
                                    borderRadius: "12px",
                                    px: 2.25,
                                    py: 1.5,
                                    gap: 1.25,
                                    justifyContent: "center",
                                    borderColor: "rgb(226 232 240)",
                                    color: "rgb(15 23 42)",
                                    backgroundColor: "#fff",
                                    fontWeight: 700,
                                    fontSize: "0.95rem",
                                    textTransform: "none",
                                    boxShadow: "none",
                                    transition:
                                        "background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
                                    "&:hover": {
                                        borderColor: "rgb(203 213 225)",
                                        backgroundColor: "rgb(248 250 252)",
                                        boxShadow: "none",
                                    },
                                    "&:active": {
                                        transform: "scale(0.995)",
                                    },
                                    "&.Mui-disabled": {
                                        borderColor: "rgb(226 232 240)",
                                        backgroundColor: "rgb(248 250 252)",
                                        color: "rgb(148 163 184)",
                                    },
                                }}
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress
                                            size={18}
                                            thickness={5}
                                            sx={{ color: "rgb(71 85 105)" }}
                                        />
                                        <span>กำลังดำเนินการ...</span>
                                    </>
                                ) : (
                                    <>
                                        <Box
                                            component="img"
                                            src="/google.svg"
                                            alt="Google"
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                display: "block",
                                                flexShrink: 0,
                                            }}
                                        />
                                        <span>{buttonText}</span>
                                    </>
                                )}
                            </Button>

                            {!googleReady && !loading ? (
                                <Typography className="text-xs text-slate-500">
                                    กำลังโหลด Google Sign-In...
                                </Typography>
                            ) : null}
                        </Stack>

                        <Box className="p-4">
                            <Typography className="text-center text-xs! leading-5 text-slate-600">
                                {agreementText}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}