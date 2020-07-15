import React from "react"
import PropTypes from "prop-types"

import _ from "lodash"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { styled } from "@material-ui/core/styles"
import { useStaticQuery, graphql } from "gatsby"

import Item from "../components/item"
import getLoggedInUser from "../components/netlifyIdentity"

export default function Items({ tags, origin }) {
  const data = useStaticQuery(graphql`
    query ItemsQuery {
      items: allMarkdownRemark(
        sort: { fields: frontmatter___title }
        filter: { frontmatter: { public: { eq: true }, enabled: { eq: true } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              path
              url
              tags
            }
          }
        }
        totalCount
      }
    }
  `)
  const tagsCount = tags.length
  const items =
    tagsCount === 0
      ? data.items.edges
      : _.filter(data.items.edges, edge => {
          return _.intersection(edge.node.frontmatter.tags, tags).length > 0
        })
  console.log(items, data.items.edges, tagsCount)
  const itemsCount = items.length
  const itemElements = _.map(items, (edge, i) => {
    return (
      <Item
        origin={origin}
        divider={i !== itemsCount - 1}
        key={edge.node.frontmatter.title}
        data={edge.node.frontmatter}
      />
    )
  })
  const hasLoggedInUser = getLoggedInUser()
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={11} style={{ width: "100%" }}>
        <List style={{ width: "100%" }}>
          {itemsCount > 0 ? (
            itemElements
          ) : (
            <ListItem
              style={{ width: "100%" }}
              component={Link}
              href="/admin/#/"
            >
              <Card style={{ width: "100%" }} variant="elevation">
                <Link href="/admin/#/">
                  <CardContent>
                    <Typography color="secondary">{hasLoggedInUser ? "Go to the CMS" : "Login"}</Typography>
                    <Typography
                      variant="caption"
                      color={"primary"}
                    >
                      Create your first item!
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </ListItem>
          )}
        </List>
      </Grid>
    </Grid>
  )
}

Items.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  origin: PropTypes.string.isRequired,
}

Items.defaultProps = {
  tags: [],
}
