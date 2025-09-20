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
