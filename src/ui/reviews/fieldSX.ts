export const fieldSX = {
    "& .MuiOutlinedInput-root": {
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: "14px",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(203,213,225,0.9)",
            borderWidth: 1.5,
            borderRadius: "14px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(148,163,184)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(15 23 42)",
            borderWidth: 2,
        },
    },
    "& .MuiInputBase-input": { color: "rgb(15,23,42)" },
    "& .MuiInputLabel-root": { color: "rgb(71,85,105)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "rgb(15 23 42)" },
} as const;