module.exports = {
  base: "/",
  title: "W3LAB",
  description: "World Wide Web Laboratory",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/docker/" },
      { text: "Stars", link: "/stars/html" },
      { text: "Github", link: "https://github.com/w3labkr/w3labkr.github.io" },
    ],
    sidebar: [
      {
        title: "Guide",
        collapsable: false,
        sidebarDepth: 1,
        children: ["/guide/docker/", "/guide/kubernetes/", "/guide/linux/"],
      },
      {
        title: "Stars",
        collapsable: false,
        sidebarDepth: 1,
        children: [
          "/stars/html",
          "/stars/css",
          "/stars/javascript",
          "/stars/php",
          "/stars/python",
        ],
      },
    ],
    search: true,
    searchMaxSuggestions: 10,
    searchPlaceholder: "Search...",
    lastUpdated: "Last Updated",
    nextLinks: true,
    prevLinks: true,
    smoothScroll: true,
  },
  plugins: [
    [
      "@vuepress/active-header-links",
      {
        sidebarLinkSelector: ".sidebar-link",
        headerAnchorSelector: ".header-anchor",
      },
    ],
    ["@vuepress/back-to-top", true],
    ["@vuepress/last-updated"],
    ["@vuepress/medium-zoom"],
    ["@vuepress/nprogress"],
    ["@vuepress/pagination"],
    [
      "@vuepress/search",
      {
        searchMaxSuggestions: 10,
      },
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-178473923-2",
      },
    ],
  ],
};
