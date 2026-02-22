export type CarClassSlug = "premium" | "comfort" | "value" | "budget";

export type CarClass = {
    slug: CarClassSlug;
    title: string;
    desc: string;
    tag: string;
    image: string;
    grade: 1 | 2 | 3 | 4;
};

export const CAR_CLASSES: CarClass[] = [
    {
        slug: "premium",
        title: "คลาส Premium",
        desc: "รถใหม่/พรีเมียม",
        tag: "Premium",
        image: "/cosySec5.webp",
        grade: 1,
    },
    {
        slug: "comfort",
        title: "คลาส Comfort",
        desc: "สมดุลราคาและความสบาย",
        tag: "Comfort",
        image: "/cosySec4.webp",
        grade: 2,
    },
    {
        slug: "value",
        title: "คลาส Value",
        desc: "คุ้มค่า ใช้งานง่าย",
        tag: "Value",
        image: "/cosySec3.webp",
        grade: 3,
    },
    {
        slug: "budget",
        title: "คลาส Budget",
        desc: "ประหยัดที่สุด",
        tag: "Budget",
        image: "/cosySec2.webp",
        grade: 4,
    },
];

export function getClassBySlug(slug: string) {
    return CAR_CLASSES.find((c) => c.slug === slug);
}