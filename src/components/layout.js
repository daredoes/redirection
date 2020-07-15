import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"
import Link from "@material-ui/core/Link"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          rssMetadata {
            title
          }
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.rssMetadata.title} />
      <Grid container direction="column" justify="center">
        <Grid item>
          <main>{children}</main>
        </Grid>
        <Grid item xs={11} component="footer" style={{alignSelf: 'center', marginBottom: '1rem'}}>
          <Grid
            container
            component="footer"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="caption">
                © {new Date().getFullYear()}, Made By{" "}
                <Link color="secondary" href="https://daredoes.work">
                  DARE
                </Link>
                , Built with{" "}
                <Link color="secondary" href="https://www.gatsbyjs.org">
                  Gatsby
                </Link>
                , styled by{" "}
                <Link color="secondary" href="https://material-ui.com/">
                  Material-UI
                </Link>
                , hosted on{" "}
                <Link color="secondary" href="https://netlify.com">
                  Netlify
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
