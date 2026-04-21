export type NavItem = {
    label: string;
    href: string;
};

export const NAV: NavItem[] = [
    { label: "AI ช่วยเลือก", href: "/assistant" },
    { label: "ดูรถทั้งหมด", href: "/cars" },
    { label: "ทำไมต้องเรา", href: "/features" },
    { label: "การจองของฉัน", href: "/my-bookings" },
    { label: "ช่วยเหลือ", href: "/help" },
    { label: "ติดต่อ", href: "/contact" },
];
