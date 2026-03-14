export function isEmailLike(v: string) {
    const s = v.trim();
    return s.includes("@") && s.includes(".");
}

export function isBookingIdLike(v: string) {
    const s = v.trim();
    if (!s) return true;
    return s.length >= 4;
}

export const contactFieldSX = {
    "& .MuiOutlinedInput-root": { borderRadius: "10px" },
};