import React from "react"

import Layout from "../components/layout"
import Items from "../components/items"
import SEO from "../components/seo"

import Grid from "@material-ui/core/Grid"

function IndexPage({  location }) {
  return (
    <Layout>
      <SEO title="Home" />
      <Grid container direction="column" justify="center" spacing={2}>
        <Grid item>
          <Items origin={location.origin} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
