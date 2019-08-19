module.exports = {
  markdown: true,
  blogPostDir: "sample-posts", // The name of directory that contains your posts.
  siteTitle: "Redirection", // Site title.
  siteTitleAlt: "Bookmarks Portal", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "http://daredo.es", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: true, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "A site for bookmarking links and making shortlinks to them.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  siteGATrackingID: "UA-47311644-4", // Tracking code ID for google analytics.
  disqusShortname: "https-vagr9k-github-io-gatsby-material-starter", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "DareDoes", // Username to display in the author segment.
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "North Pole, Earth", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription:
    "Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year. And the good thing about dogs... is they got different dogs for different people.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/daredoes/redirection",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/daredoestweets",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:me@daredoes.work",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2018. DareDoes" // Copyright string for the footer of the website and RSS feed.
};
