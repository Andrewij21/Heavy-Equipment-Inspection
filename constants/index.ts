export const NAV_LINKS = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "dashboard",
          url: "/dashboard",
          roles: ["mechanic"],
        },
        {
          title: "inspections",
          url: "/inspections",
          roles: ["mechanic"],
        },
        {
          title: "inspections",
          url: "/inspections/new",
          roles: ["mechanic"],
        },
        {
          title: "Users",
          url: "/users",
          roles: ["mechanic"],
        },
        {
          title: "Todo",
          url: "/todo",
          roles: ["mechanic", "admin"],
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
