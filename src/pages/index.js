import React, { useState } from "react"

import Layout from "../components/layout"
import Items from "../components/items"
import SEO from "../components/seo"
import Filters from "../components/filters"

import Grid from "@material-ui/core/Grid"

function IndexPage({  location }) {
  const [tags, setTags] = useState([])
  return (
    <Layout>
      <SEO title="Home" />
      <Grid container direction="column" justify="center" spacing={2}>
        <Grid item>
          <Filters onChange={setTags} />
        </Grid>
        <Grid item>
          <Items tags={tags} origin={location.origin} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
