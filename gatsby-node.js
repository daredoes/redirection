const path = require("path")
const fs = require("fs")
const { writeJsonSync } = require("fs-extra")

let data_json = {}

outputJSON = publicFolder => {
  writeJsonSync(publicFolder, data_json, { spaces: "\t" })
}

formatMarkdownItems = items => {
  return items.edges.map(edge => {
    return {
      title: edge.node.frontmatter.title,
      path: edge.node.frontmatter.path,
      url: edge.node.frontmatter.url,
      public: edge.node.frontmatter.public,
      enabled: edge.node.frontmatter.enabled,
      tags: edge.node.frontmatter.tags,
    }
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
  type MarkdownRemark implements Node {
    frontmatter: Frontmatter
  }
  type Frontmatter {
    title: String!
    path: String
    url: String!
    public: Boolean!
    enabled: Boolean!
    tags: [String!]
  }
  `
  createTypes(typeDefs)
}

exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions
  const createRedirectItem = item => {
    createRedirect({
      fromPath: item.path,
      toPath: item.url,
      isPermanent: true,
      force: true,
    })
  }

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            items: allMarkdownRemark(
              filter: { frontmatter: { enabled: { eq: true }, path: { ne: null } } }
            ) {
              edges {
                node {
                  frontmatter {
                    title
                    path
                    url
                    public
                    enabled
                    tags
                  }
                }
              }
              totalCount
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        let items = formatMarkdownItems(result.data.items)
        items
          .forEach(item => {
            createRedirectItem(item)
          })
        data_json = { items: items }
      })
    )
  })
}

function buildPrefixer(prefix, ...paths) {
  return (...subpaths) => path.join(prefix, ...paths, ...subpaths)
}

exports.onPostBuild = async ({ store, pathPrefix }, userPluginOptions) => {
  const { program } = store.getState()
  const publicFolder = buildPrefixer(program.directory, `public`)
  outputJSON(publicFolder(`data.json`))
}