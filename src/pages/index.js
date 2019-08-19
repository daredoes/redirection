import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Item from "../components/item"
import SEO from "../components/seo"

import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEyeSlash as hiddenIcon } from "@fortawesome/free-regular-svg-icons"
import { faEye as visibleIcon } from "@fortawesome/free-solid-svg-icons"

import getLoggedInUser from '../components/netlifyIdentity';
const noTag = "None";

function addOneOrCreateForDict(dict, key) {
  if (!dict.hasOwnProperty(key)) {
    dict[key] = 0;
  }
  dict[key] += 1;
}

function addToDefaultDict(dict, key, value) {
  if (!dict.hasOwnProperty(key)) {
    dict[key] = value;
  }
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    const data = props.data;
    this.origin = props.location.origin;
    const doesStartWithFiltersOn = true;
    this.publicItems = data.items.edges.filter((edge) => edge.node.frontmatter.public);

    let publicTags = {};
    let publicTagCount = {};
    this.publicItems.forEach((edge) => {
      if (!edge.node.frontmatter.tags) {
        addOneOrCreateForDict(publicTagCount, noTag);
      } else {
        edge.node.frontmatter.tags.forEach((tag) => {
          addToDefaultDict(publicTags, tag, doesStartWithFiltersOn);
          addOneOrCreateForDict(publicTagCount, tag);
        });
      }
    })
    this.state = {
      tags: publicTags,
      tagCounts: publicTagCount,
      filters: false,
    }
  }

  makeTagElements = () => {
    let keys = Object.keys(this.state.tags);
    keys.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    return keys.map((key) => {
      let flipTagState = () => {
        let tags = this.state.tags;
        tags[key] = !tags[key];
        this.setState({
          tags: tags
        })
      };

      return (
        <Dropdown.Item as={Button} key={key} onClick={flipTagState} className="p-2"  variant="outline-dark" title={`${this.state.tagCounts[key]} Items`}><FontAwesomeIcon icon={this.state.tags[key] ? visibleIcon : hiddenIcon}/>&nbsp;{key} <span className="text-secondary">({this.state.tagCounts[key]} bookmark{this.state.tagCounts[key] !== 1 ? 's' : ''})</span></Dropdown.Item>
      ); 
    })
  }

  componentDidUpdate = () => {
    this.origin = this.props.location.origin;
  }

  makeBookmarkElements = () => {
    return this.publicItems.filter((edge) => {
      if (!edge.node.frontmatter.tags) {
        return true;  // this.state.tags[noTag];
      }
      let tags = edge.node.frontmatter.tags;
      let isInFilter = false;
      tags.forEach((tag) => {
        if (this.state.tags[tag]){
          isInFilter = true;
        }
      })
      return isInFilter;

    }).map((edge, i) => {
      return <Item origin={this.origin} variant={i % 2 ? 'secondary' : 'dark'} key={edge.node.frontmatter.title} data={edge.node.frontmatter} />
    });
  }

  flipAllFilters = (state) => {
    let tags = {};
    Object.keys(this.state.tags).forEach((tag) => {
      tags[tag] = state;
    })
    this.setState({
      tags: tags
    })
  };

  preventDropdownFromClosingOnSelect = (isOpen, e, {source}) => {
    if (!isOpen && source === "select" && e.target.id !== "closeMenu") {
      this.setState({filters: true})
    } else {
      this.setState({filters: isOpen})
    }
  }


  render() {
    let keys = Object.keys(this.state.tags);
    keys.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    let tagFilterElements = this.makeTagElements()
    let publicItemElements = this.makeBookmarkElements();
    const tagKeys = Object.keys(this.state.tags);
    const hasAllFiltersActive = tagKeys.filter((tag) => this.state.tags[tag]).length === tagKeys.length;
    const isPlural = publicItemElements.length !== 1;
    const isPluralFilters = tagFilterElements.length !== 1;

    const flipFilters = () => {
      this.flipAllFilters(!hasAllFiltersActive);
    }

    const hasLoggedInUser = getLoggedInUser();

    return (<Layout>
      <SEO title="Home" />
      <div className="d-flex flex-column mt-2">
        { tagFilterElements.length > 0 && <div className="sticky-top pt-2 pb-2 bg-light d-flex flex-column justify-content-between">
        <Dropdown drop="down" show={this.state.filters} onToggle={this.preventDropdownFromClosingOnSelect}> 
          <Dropdown.Toggle variant="dark" id="dropdown-basic" block size="lg">
          Filter{isPluralFilters && 's'}
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-100" flip={false} style={{maxHeight: "75vh", overflowY: "scroll"}}>
            <Dropdown.Item as={Button} onClick={flipFilters} className=" p-2"><FontAwesomeIcon icon={hasAllFiltersActive ? visibleIcon : hiddenIcon}/>{` `}{hasAllFiltersActive ? 'Disable' : 'Enable'} All Filters</Dropdown.Item>
            {tagFilterElements}
            <Dropdown.Header>Showing {publicItemElements.length} bookmark{isPlural && 's'}</Dropdown.Header>
          </Dropdown.Menu>
        </Dropdown>
    </div> }
        <ListGroup className="pt-2">
          {this.publicItems.length > 0 ? publicItemElements : <ListGroup.Item variant="dark"><a href="/admin/">{hasLoggedInUser ? 
          "Go to the CMS" : "Login"}</a> to add your first bookmark!</ListGroup.Item>}
        </ListGroup>
      </div>
    </Layout>)
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
  items: allMarkdownRemark(sort: {fields: frontmatter___title}, filter: {frontmatter: {public: {eq: true}}}) {
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
`;
export default IndexPage
