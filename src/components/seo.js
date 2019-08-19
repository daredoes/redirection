/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            rssMetadata {
              title
              description
              author
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.rssMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.rssMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.rssMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=eEvaGRPOqd" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=eEvaGRPOqd" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=eEvaGRPOqd" />
      <link rel="manifest" href="/site.webmanifest?v=eEvaGRPOqd" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg?v=eEvaGRPOqd" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico?v=eEvaGRPOqd" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
