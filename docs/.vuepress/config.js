module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
  themeConfig: {
    // logo: './logo.png',
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "External", link: "https://google.com" },
    ],
    sidebar: [
      {
        title: "Group 1", // required
        path: "/foo/", // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1, // optional, defaults to 1
        children: ["/"],
      },
      {
        title: "Group 2",
        children: [
          /* ... */
        ],
        initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
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
    ["@vuepress/blog"],
    [
      "@vuepress/active-header-links",
      {
        sidebarLinkSelector: ".sidebar-link",
        headerAnchorSelector: ".header-anchor",
      },
    ][("@vuepress/back-to-top", true)],
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
