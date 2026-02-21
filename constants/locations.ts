export const LOCATIONS = [
    { label: "กรุงเทพฯ", value: "bangkok" },
    { label: "เชียงใหม่", value: "chiang-mai" },
    { label: "ภูเก็ต", value: "phuket" },
    { label: "พัทยา", value: "pattaya" },
] as const;

export type Location = typeof LOCATIONS[number];
export type LocationValue = Location["value"];