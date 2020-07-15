import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import SimpleDialog from "./simple-dialog"
import getLoggedInUser from "../components/netlifyIdentity"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import MLink from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"

const aboutBody = (
  <div>
    <p>
      This goal of this website is to store your favorite urls on the internet,
      while making it convenient to share them with your friends.
    </p>
    <p>
      Each bookmarked url can be given a custom path that attaches to the end of
      the website url.
    </p>
    <p>
      Copy the link address of any of the bookmarks on the site to save their
      custom url.
    </p>
  </div>
)

const Header = ({ siteTitle }) => {
  const [modalShow, setModalShow] = React.useState(false)
  const hasLoggedInUser = getLoggedInUser()
  console.log(typeof aboutBody)
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={2} alignItems="center" wrap="nowrap">
              <Grid item>
                <MLink color="inherit" variant="h6" component={Link} to="/">
                  {siteTitle}
                </MLink>
              </Grid>
              <Grid item>
                <MLink
                  color="inherit"
                  href={`/admin${hasLoggedInUser ? "/logout/" : "/#/"}`}
                >
                  {hasLoggedInUser ? "Logout" : "Login"}
                </MLink>
              </Grid>
              <Grid item>
                <MLink
                  color="inherit"
                  href="#"
                  onClick={() => setModalShow(true)}
                >
                  About
                </MLink>
              </Grid>
              <Grid item>
                <MLink
                  color="inherit"
                  target="_blank"
                  href="https://app.netlify.com/start/deploy?repository=https://github.com/daredoes/redirection"
                >
                  Deploy To Netlify!
                </MLink>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
      <SimpleDialog
        title="About"
        body={aboutBody}
        onClose={() => setModalShow(false)}
        open={modalShow}
      />
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
