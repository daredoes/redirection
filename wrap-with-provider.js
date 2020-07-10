import React from 'react'

import Helmet from 'react-helmet'

import CssBaseline from '@material-ui/core/CssBaseline';


// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  return (
    <React.Fragment>
      <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      </Helmet>
      <CssBaseline />
      {element}
    </React.Fragment>
  )
}