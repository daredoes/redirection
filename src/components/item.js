import PropTypes from "prop-types"
import React from "react"
import ListItem from "@material-ui/core/ListItem"

import Chip from "@material-ui/core/Chip"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const Item = ({ data, divider, origin }) => {
  let tags = data.tags || []
  const { title, path, url } = data
  const link = path ? `.${path}` : url
  const hasCustomPath = path
  return (
    <ListItem
      component={"a"}
      target="_blank"
      alignItems="center"
      href={link}
      style={{ width: "100%" }}
    >
      <Card style={{ width: "100%" }} variant="elevation">
        <Link href={link} target="_blank">
          <CardContent>
            <Typography color="secondary">{title}</Typography>
            <Typography
              variant="caption"
              color={hasCustomPath ? "primary" : undefined}
            >
              {hasCustomPath ? `${origin}${path}` : "No Custom URL"}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          {tags.map((tag, i) => (
            <Grid key={i} item>
              <Chip size="small" key={i} label={tag} />
            </Grid>
          ))}
        </CardActions>
      </Card>
    </ListItem>
  )
}

Item.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    url: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    enabled: PropTypes.bool,
  }).isRequired,
  divider: PropTypes.bool.isRequired,
  origin: PropTypes.string,
}

export default Item
