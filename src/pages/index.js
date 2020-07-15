import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Item from "../components/item"
import SEO from "../components/seo"
import Filters from "../components/filters"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEyeSlash as hiddenIcon } from "@fortawesome/free-regular-svg-icons"
import { faEye as visibleIcon } from "@fortawesome/free-solid-svg-icons"

import getLoggedInUser from "../components/netlifyIdentity"
const noTag = "None"

function addOneOrCreateForDict(dict, key) {
  if (!dict.hasOwnProperty(key)) {
    dict[key] = 0
  }
  dict[key] += 1
}

function addToDefaultDict(dict, key, value) {
  if (!dict.hasOwnProperty(key)) {
    dict[key] = value
  }
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    const data = props.data
    this.origin = props.location.origin
    const doesStartWithFiltersOn = true
    this.publicItems = data.items.edges.filter(
      edge => edge.node.frontmatter.public
    )

    let publicTags = {}
    let publicTagCount = {}
    this.publicItems.forEach(edge => {
      if (!edge.node.frontmatter.tags) {
        addOneOrCreateForDict(publicTagCount, noTag)
      } else {
        edge.node.frontmatter.tags.forEach(tag => {
          addToDefaultDict(publicTags, tag, doesStartWithFiltersOn)
          addOneOrCreateForDict(publicTagCount, tag)
        })
      }
    })
    this.state = {
      tags: publicTags,
      tagCounts: publicTagCount,
      filters: false,
    }
  }

  makeTagElements = () => {
    let keys = Object.keys(this.state.tags)
    keys.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    return keys.map(key => {
      let flipTagState = () => {
        let tags = this.state.tags
        tags[key] = !tags[key]
        this.setState({
          tags: tags,
        })
      }

      return (
        <div></div>
        //<Dropdown.Item as={Button} key={key} onClick={flipTagState} className="p-2"  variant="outline-dark" title={`${this.state.tagCounts[key]} Items`}><FontAwesomeIcon icon={this.state.tags[key] ? visibleIcon : hiddenIcon}/>&nbsp;{key} <span className="text-secondary">({this.state.tagCounts[key]} bookmark{this.state.tagCounts[key] !== 1 ? 's' : ''})</span></Dropdown.Item>
      )
    })
  }

  componentDidUpdate = () => {
    this.origin = this.props.location.origin
  }

  makeBookmarkElements = () => {
    return this.publicItems
      .filter(edge => {
        if (!edge.node.frontmatter.tags) {
          return true // this.state.tags[noTag];
        }
        let tags = edge.node.frontmatter.tags
        let isInFilter = false
        tags.forEach(tag => {
          if (this.state.tags[tag]) {
            isInFilter = true
          }
        })
        return isInFilter
      })
      .map((edge, i) => {
        console.log(edge.node)
        return (
          <Item
            origin={this.origin}
            divider={i !== 0}
            key={edge.node.frontmatter.title}
            data={edge.node.frontmatter}
          />
        )
      })
  }

  flipAllFilters = state => {
    let tags = {}
    Object.keys(this.state.tags).forEach(tag => {
      tags[tag] = state
    })
    this.setState({
      tags: tags,
    })
  }

  preventDropdownFromClosingOnSelect = (isOpen, e, { source }) => {
    if (!isOpen && source === "select" && e.target.id !== "closeMenu") {
      this.setState({ filters: true })
    } else {
      this.setState({ filters: isOpen })
    }
  }

  render() {
    let keys = Object.keys(this.state.tags)
    keys.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    let tagFilterElements = this.makeTagElements()
    let publicItemElements = this.makeBookmarkElements()
    const tagKeys = Object.keys(this.state.tags)
    const hasAllFiltersActive =
      tagKeys.filter(tag => this.state.tags[tag]).length === tagKeys.length
    const isPlural = publicItemElements.length !== 1
    const isPluralFilters = tagFilterElements.length !== 1

    const flipFilters = () => {
      this.flipAllFilters(!hasAllFiltersActive)
    }

    const hasLoggedInUser = getLoggedInUser()

    return (
      <Layout>
        <SEO title="Home" />
        <Grid container direction="column">
          <Grid item>
            <Filters />
          </Grid>
          <Grid item>
            <List className="pt-2">
              {this.publicItems.length > 0 ? (
                publicItemElements
              ) : (
                <ListItem>
                  <a href="/admin/#/">
                    {hasLoggedInUser ? "Go to the CMS" : "Login"}
                  </a>{" "}
                  to add your first bookmark!
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        rssMetadata {
          title
        }
      }
    }
    items: allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { frontmatter: { public: { eq: true } } }
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
export default IndexPage
