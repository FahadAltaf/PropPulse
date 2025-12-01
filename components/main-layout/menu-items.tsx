import { UserRoles } from "@/types/types";
import {
  RiScanLine,
  RiSettings3Line,
  RiTeamLine,
  RiFileListLine,
} from "@remixicon/react";

export const getNavData = (user: { roles?: string }) => {
  const navMain = [
    {
      title: "Sections",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: RiScanLine,
          isActive: false,
        },
      ],
    },
  ];

  const adminNavMain = [
    {
      title: "Sections",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: RiScanLine,
          isActive: false,
        },
      ],
    },

    {
      title: "Admin Area",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "/settings",
          icon: RiSettings3Line,
        },
        {
          title: "Users",
          url: "/users",
          icon: RiTeamLine,
          isActive: false,
          resource: "users",
        },
      ],
    },
  ];

  const isAdmin =
    user.roles === UserRoles.ADMIN || user.roles?.includes(UserRoles.ADMIN);

  return {
    navMain: isAdmin ? adminNavMain : navMain,
  };
};
