export const NAV_LINKS = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "dashboard",
          url: "/dashboard",
          roles: ["mechanic", "admin", "leader"],
        },
        {
          title: "profile",
          url: "/profile",
          roles: ["mechanic", "admin", "leader"],
        },
        {
          title: "inspections",
          url: "/inspections",
          roles: ["mechanic"],
        },
        {
          title: "verification",
          url: "/verification",
          roles: ["leader", "admin"],
        },
        {
          title: "Users",
          url: "/users",
          roles: ["admin"],
        },
        {
          title: "Reports",
          url: "/reports",
          roles: ["admin"],
        },
      ],
    },
    {
      title: "admin",
      url: "/admin",
      roles: ["admin"],
      items: [],
    },
  ],
};
