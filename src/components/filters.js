import React, { useState } from "react"
import PropTypes from "prop-types"
import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import { useStaticQuery, graphql } from "gatsby"
import _ from "lodash"

export default function Filters({ onChange }) {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      items: allMarkdownRemark(
        filter: { frontmatter: { enabled: { eq: true } } }
      ) {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
        totalCount
      }
    }
  `)
  const tags = _.sortBy(_.filter(
    _.uniq(
      _.flatMap(data.items.edges, edge => {
        return edge.node.frontmatter.tags
      })
    ),
    o => {
      return o !== null
    }
  ), (o) => o)

  const [selectedTags, setTags] = useState([])
  const handleChange = (event, value) => {
    setTags(value)
    if (onChange) {
      onChange(value)
    }
  }
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ marginTop: "1rem" }}
    >
      <Grid item xs={11} style={{ width: "100%" }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={_.difference(tags, selectedTags)}
          getOptionLabel={option => option}
          onChange={handleChange}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              label="Filter By Tags"
              placeholder="Tags"
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

Filters.propTypes = {
  onChange: PropTypes.func,
}

Filters.defaultProps = {
  onChange: () => {},
}
