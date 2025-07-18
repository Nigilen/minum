import type { MenuItem } from "@/types/types";

export const menuItems: MenuItem[] = [
  {
    name: "Todo",
    alias: "Done",
    path: "/",
    icon: () => import('@/components/icons/IconDone.vue'),
  }
];