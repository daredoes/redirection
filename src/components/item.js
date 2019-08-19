import PropTypes from "prop-types"
import React from "react"

import ListGroupItem from "react-bootstrap/ListGroupItem"
import Badge from "react-bootstrap/Badge"

const Item = ({ data, variant, origin }) => {
  let tags = data.tags || [];
  const { title, path, url } = data;
  const link = path ? `.${path}` : url;
  return (
    <ListGroupItem variant={variant} action target="blank" href={link} className="d-flex flex-column">
      <span className="text-primary">{title}</span>
      <div className="d-flex justify-content-between flex-wrap">
        <span className="blockquote-footer text-break">

        {path ? `${origin}${path}` : "No Custom URL"}
        </span>
        <div className="d-flex justify-content-between align-items-center flex-wrap align-self-end">
          {tags.map((tag, i) => <Badge key={i} pill variant="light" className="mr-1 mt-1">{tag}</Badge>)}
        </div>
      </div>
    </ListGroupItem>
  )
}

Item.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    url: PropTypes.string,
    tags: PropTypes.string
  }).isRequired,
  variant: PropTypes.string,
  origin: PropTypes.string,
}

export default Item
