import React from "react"
import PropTypes from "prop-types"

import _ from "lodash"

import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import { useStaticQuery, graphql } from "gatsby"

import MUIDataTable from "mui-datatables"

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
  const items = data.items.edges
  const itemData = _.map(items, (edge, i) => {
    const frontmatter = edge.node.frontmatter
    const link = frontmatter.path ? `.${frontmatter.path}` : frontmatter.url
    console.log(
      frontmatter.tags,
      _.map(frontmatter.tags, o => _.upperFirst(o))
    )
    const displayLink = frontmatter.path
      ? `${origin}${frontmatter.path}`
      : "No Custom URL"
    return {
      title: frontmatter.title,
      link: displayLink,
      url: link,
      tags: frontmatter.tags
        ? _.map(frontmatter.tags, o => _.upperFirst(o))
        : null,
    }
  })
  const columns = [
    {
      name: "title",
      label: "Name",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: dataIndex => {
          return (
            <Link href={itemData[dataIndex].url} target="_blank">
              <Typography color="inherit">
                {itemData[dataIndex].title}
              </Typography>
            </Link>
          )
        },
      },
    },
    {
      name: "link",
      label: "URL",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: dataIndex => {
          return (
            <Link href={itemData[dataIndex].url} target="_blank">
              <Typography color="secondary">
                {itemData[dataIndex].link}
              </Typography>
            </Link>
          )
        },
      },
    },
    {
      name: "tags",
      label: "Tags",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: dataIndex => {
          return (
            <Grid container spacing={1}>
              {_.map(itemData[dataIndex].tags, (tag, i) => {
                return (
                  <Grid key={i} item>
                    <Chip
                      size="small"
                      className="capitalize-deeply"
                      key={i}
                      label={_.upperFirst(tag)}
                    />
                  </Grid>
                )
              })}
            </Grid>
          )
        },
        customFilterListOptions: {
          render: v => (v ? v : "No Tag"),
        },
        filterOptions: {
          renderValue: v => (v ? v : "No Tag"),
        },
      },
    },
  ]

  const options = {
    print: false,
    download: false,
    selectableRows: "none",
  }
  return (
    <MUIDataTable
      title={"Bookmarks"}
      data={itemData}
      columns={columns}
      options={options}
    />
  )
}

Items.propTypes = {
  origin: PropTypes.string.isRequired,
}
