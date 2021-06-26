module.exports = {
  title: "VuePress",
  description: "Just playing around",
  themeConfig: {
    // logo: './logo.png',
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about/" },
      { text: "Guide", link: "/guide/docker/installation" },
    ],
    sidebar: [
      {
        title: 'Docker',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/guide/docker/installation',
          '/guide/docker/onbuild'
        ]
      },
      {
        title: 'Kubernetes',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/guide/kubernetes/installation',
        ]
      }
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
